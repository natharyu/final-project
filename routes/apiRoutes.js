import express from "express";
import userRoutes from "./api/userRoutes.js";
import productRoutes from "./api/productRoutes.js";
import categoryRoutes from "./api/categoryRoutes.js";

const apiRoutes = express.Router();

apiRoutes.use("/users", userRoutes);
apiRoutes.use("/products", productRoutes);
apiRoutes.use("/categories", categoryRoutes);

export default apiRoutes;
