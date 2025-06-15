import axios from "axios";
export const youtubeSearch = async (req, res) => {
  const { query } = req.query;
  if (!query) return res.status(400).json({ error: "Query term is required" });

  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          q: query,
          part: "snippet",
          maxResults: 5,
          type: "video",
          key: process.env.youtube_api_key,
        },
      }
    );

    res.status(200).json(response.data.items);
  } catch (error) {
    console.error("YouTube API Error:", error);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
};
