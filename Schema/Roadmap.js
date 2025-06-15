import mongoose from "mongoose";

const roadmapSchema = new mongoose.Schema({
  goal: {
    type: String,
    required: true,
  },
  roadmap: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Roadmaps", roadmapSchema);
