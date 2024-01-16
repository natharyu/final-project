import bcrypt from "bcrypt";
import Query from "../model/Query.js";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [existingUser] = await Query.getOneByField("users", "email", email);
    if (existingUser) {
      return res.status(400).json({ error: "Cet e-mail est déjà utilisé." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await Query.create("users", {
      email: email,
      password: hashedPassword,
    });

    return res.status(200).json({ message: "Inscription reussie vous pouvez vous connecter !" });
  } catch (error) {
    return res.status(500).json({ error: "Erreur lors de l'inscription" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [user] = await Query.getOneByField("users", "email", email);
    if (!user) {
      return res.status(401).json({ error: "Erreur lors de la connexion." });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Erreur lors de la connexion." });
    }
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: "1d",
    });

    res.cookie("Session", token, { sameSite: "lax", httpOnly: true });

    return res.status(200).json({ message: "Connexion reussie." });
  } catch (error) {
    return res.status(500).json({ error: "Une erreur est survenue." });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("Session");
    res.end();
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la déconnexion" });
  }
};

const checkAuth = (req, res) => {
  try {
    const token = req.cookies.Session;
    if (!token) {
      return res.status(200).json({ isLoggedIn: false, role: null, message: "Refresh token manquant" });
    }
    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
      if (err) {
        return res.status(200).json({ isLoggedIn: false, role: null, message: "Token invalide" });
      }
      return res.status(200).json({ isLoggedIn: true, role: user.role });
    });
  } catch (error) {
    return res.status(500).json({ error: "Une erreur est survenue" });
  }
};

export default { login, register, logout, checkAuth };
