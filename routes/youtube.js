import axios from "axios";
import youtubeAPI from "../utils/Youtube.js";

export const youtubeSearch = async (req, res) => {
  const { query } = req.query;
  if (!query) return res.status(400).json({ error: "Query term is required" });

  try {
    const response = await youtubeAPI.get("/search", {
      params: {
        q: query,
      },
    });

    res.status(200).json(response.data.items);
  } catch (error) {
    console.error("YouTube API Error:", error);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
};
