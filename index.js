import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./DB/Db.js";
import { signin, signup } from "./Controller/AuthController.js";
import crypto from "crypto";
import { verifyToken } from "./middleware/authMiddleware.js";
import { generateRoadmap } from "./routes/generateRoadmap.js";
import { youtubeSearch } from "./routes/youtube.js";
import { getRoadmapById, getRoadmaps } from "./Controller/RoadmapController.js";

dotenv.config();
connectDb();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the JWT authenticated API!");
});

app.post("/signup", signup);

app.post("/signin", signin);

app.post("/getRoadmapById", getRoadmapById);

app.post("/generate-roadmap", verifyToken, generateRoadmap);

app.get("/getRoadmaps", verifyToken, getRoadmaps);

app.get("/youtube/search", youtubeSearch);

app.get("/verify-token", verifyToken, (req, res) => {
  res.status(200).json({ valid: true, user: req.user });
});

app.listen(3000, () => {
  console.log(`server is listening on port 3000`);
});
