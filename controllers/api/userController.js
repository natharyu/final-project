import Query from "../../model/Query.js";

const getAll = async (req, res) => {
  try {
    const users = await Query.getAll("users");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Une erreur est survenue" });
  }
};

export default { getAll };
