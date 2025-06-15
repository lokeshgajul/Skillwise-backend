import axios from "axios";

const youtubeAPI = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    type: "video",
    maxResults: 5,
    key: process.env.youtube_api_key,
  },
});

export default youtubeAPI;
