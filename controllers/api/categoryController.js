import Query from "../../model/Query.js";

const getAll = async (req, res) => {
  try {
    const categories = await Query.getAll("categories");
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ error: "Une erreur est survenue" });
  }
};

const getOne = async (req, res) => {
  try {
    const category = await Query.getOneByField("categories", "id", req.params.id);
    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({ error: "Une erreur est survenue" });
  }
};

export default { getAll, getOne };
