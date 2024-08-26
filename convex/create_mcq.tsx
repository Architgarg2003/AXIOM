
import { v } from "convex/values";
import { action } from "./_generated/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { generateMCQ } from "./openai";
// Access your API key as an environment variable


export const get_mcq = action({
  args: {
    jobTitle: v.string(),
    jobDescription: v.string(),
    resume: v.string(),
    difficulty:v.string(),
    companyName:v.string()
  },
  handler: async (ctx, { jobTitle, jobDescription, resume, difficulty, companyName }) => {
    try {
      const mcq = await generateMCQ(jobTitle, jobDescription, resume, difficulty, companyName);
      return mcq;
    } catch (error) {
      console.error("Error in get_mcq action:", error);
      throw new Error("Failed to generate MCQs");
    }
  }
});