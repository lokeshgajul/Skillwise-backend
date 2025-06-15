import express from "express";
import Roadmap from "../Schema/Roadmap.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.gemini_apikey);

export const generateRoadmap = async (req, res) => {
  try {
    const { goal } = req.body;

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
