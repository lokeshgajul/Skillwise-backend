import express from "express";
import { youtubeSearch } from "../controllers/YoutubeController.js";

const router = express.Router();

router.get("/search", youtubeSearch);

export default router;
