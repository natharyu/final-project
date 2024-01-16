import express from "express";
import categoryController from "../../controllers//api/categoryController.js";

const categoryRoutes = express.Router();

categoryRoutes.get("/get", categoryController.getAll);
categoryRoutes.get("/get/:id", categoryController.getOne);

export default categoryRoutes;
