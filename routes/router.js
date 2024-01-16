import express from "express";
import path from "path";
import authRoutes from "./authRoutes.js";
import apiRoutes from "./apiRoutes.js";
import { adminOnly } from "./middlewares/authMiddleware.js";

const __dirname = path.resolve();
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/api/v1", apiRoutes);

router.get("dashboard*", adminOnly, (req, res) => {
  res.sendFile(path.join(__dirname, "view/dist", "index.html"));
});
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "view/dist", "index.html"));
});

export default router;
