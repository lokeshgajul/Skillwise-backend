import express from "express";
import { youtubeSearch } from "../controllers/youtubeController.js";

const router = express.Router();

router.get("/search", youtubeSearch);

export default router;
