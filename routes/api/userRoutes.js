import express from "express";
import userController from "../../controllers/api/userController.js";
import { adminOnly, userOnly } from "../middlewares/authMiddleware.js";

const userRoutes = express.Router();

userRoutes.get("/get", userController.getAll);

export default userRoutes;
