import express from "express";
import Roadmap from "../Schema/Roadmap.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.gemini_apikey);

export const generateRoadmap = async (req, res) => {
  try {
    const { goal } = req.body;
    const { id: userId, username } = req.user;

    const prompt = `Create a clear, structured, and user-friendly step-by-step learning roadmap to become a ${goal}. 
                    Organize the output into phases and milestones. 
                    Use section titles, short bullet points, and concise steps. 
                    Avoid markdown (*, **, -, #). Format it for easy display on a website.
                    Example structure:
                    Phase 1: Title
                    Milestone 1: Title
                    - Step 1: Do this
                    - Step 2: Learn that
                    - Tools: Tool 1, Tool 2`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.candidates[0].content.parts[0].text;

    const newRoadmap = new Roadmap({
      userId,
      userName: username,
      goal,
      roadmap: text,
      createdAt: new Date(),
    });

    await newRoadmap.save();

    console.log("Roadmap saved to database:", newRoadmap);

    res.status(200).json({ roadmap: text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Failed to generate roadmap" });
  }
};

export const getRoadmaps = async (req, res) => {
  const { id: userId } = req.user;

  try {
    const filterdRoadmaps = await Roadmap.find({ userId })
      .sort({ createdAt: -1 })
      .lean();
    res.status(200).json({ roadmaps: filterdRoadmaps });
  } catch (error) {
    console.error("Error fetching roadmaps:", error);
    res.status(500).json({ message: "Failed to fetch roadmaps" });
  }
};

export const getRoadmapById = async (req, res) => {
  const { id } = req.body;
  try {
    const specificRoadmap = await Roadmap.findById(id);
    res.status(200).json({
      message: "roadmap fetched",
      roadmap: specificRoadmap,
    });
  } catch (error) {
    console.log(error);
  }
};
