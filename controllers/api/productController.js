import Query from "../../model/Query.js";

const getAll = async (req, res) => {
  try {
    const products = await Query.getAllProducts("products", "categories", "category_id", "id");
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: "Une erreur est survenue" });
  }
};

const getOne = async (req, res) => {
  try {
    const product = await Query.getOneByField("products", "id", req.params.id);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: "Une erreur est survenue" });
  }
};

const getProductImages = async (req, res) => {
  try {
    const productImages = await Query.getOneByField("images", "product_id", req.params.id);
    return res.status(200).json(productImages);
  } catch (error) {
    return res.status(500).json({ error: "Une erreur est survenue" });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const products = await Query.getOneByField("products", "category_id", req.params.id);
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: "Une erreur est survenue" });
  }
};

export default { getAll, getOne, getProductImages, getProductsByCategory };
