import express from "express";
import { youtubeSearch } from "../Controller/YoutubeController.js";

const router = express.Router();

router.get("/search", youtubeSearch);

export default router;
