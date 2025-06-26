import express from "express";
import authRoutes from "./authRoutes.js";
import youtubeRoutes from "./youtubeRoutes.js";
import roadmapRoutes from "./roadmapRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/youtube", youtubeRoutes);
router.use("/roadmaps", roadmapRoutes);

export default router;
