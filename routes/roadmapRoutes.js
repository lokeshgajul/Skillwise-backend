import express from "express";
import { signin, signup } from "../Controller/authController.js";
import {
  generateRoadmap,
  getRoadmapById,
  getRoadmaps,
} from "../Controller/roadmapController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to the JWT authenticated API!");
});

router.post("/getRoadmapById", getRoadmapById);

router.post("/generate-roadmap", verifyToken, generateRoadmap);

router.get("/getRoadmaps", verifyToken, getRoadmaps);

export default router;
