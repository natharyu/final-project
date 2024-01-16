import express from "express";
import productController from "../../controllers/api/productController.js";

const productRoutes = express.Router();

productRoutes.get("/get", productController.getAll);
productRoutes.get("/get/:id", productController.getOne);
productRoutes.get("/getProductImages/:id", productController.getProductImages);
productRoutes.get("/getProductsByCategory/:id", productController.getProductsByCategory);

export default productRoutes;
