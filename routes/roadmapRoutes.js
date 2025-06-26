import express from "express";
import {
  generateRoadmap,
  getRoadmapById,
  getRoadmaps,
} from "../controllers/roadmapController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to the JWT authenticated API!");
});

router.post("/getRoadmapById", getRoadmapById);

router.post("/generate-roadmap", verifyToken, generateRoadmap);

router.get("/getRoadmaps", verifyToken, getRoadmaps);

export default router;
