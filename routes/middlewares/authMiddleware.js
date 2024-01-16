import jwt from "jsonwebtoken";

function userOnly(req, res, next) {
  const token = req.headers["authorization"] ? req.headers["authorization"].split(" ")[1] : null;
  // const token = req.cookies.Session;
  if (!token) {
    return res.redirect("/login");
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.redirect("/login");
    }
    req.userId = decoded.id;
    next();
  });
}

function adminOnly(req, res, next) {
  const token = req.headers["authorization"] ? req.headers["authorization"].split(" ")[1] : null;
  // const token = req.cookies.Session;
  if (!token) {
    return res.redirect("/error");
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      res.redirect("/login");
    }
    if (user.role === "admin") {
      next();
    } else {
      return res.redirect("/error");
    }
  });
}

export { userOnly, adminOnly };
