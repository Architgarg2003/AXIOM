

// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const genAI = new GoogleGenerativeAI('AIzaSyBK1edzaiNbCD3ngi7OL2yX-z3XqBjKuG4');

// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const generateMCQ = async (jobTitle: string, jobDescription: string, resume: string, difficulty: string, companyName: string) => {
//   const prompt = `
// Generate a set of 10 to 20 multiple-choice questions (MCQs) based on the given job title, job description, and the user's resume. Each MCQ should consist of the following:

// 1. A question related to the skills, qualifications, or experience required for the job.
// 2. An array of four possible answer options, where one is correct.
// 3. The correct answer's index number (starting from 1).

// Job Title: ${jobTitle}

// Company Name: ${companyName}

// Job Description: 
// ${jobDescription}

// User's Resume: 
// ${resume}

// difficulty level:
// ${difficulty}

// Please provide the output in the following JSON format without any additional formatting or markdown:

// [
//   {
//     "question": "What is the primary responsibility of a Full Stack Developer?",
//     "options": [
//       "Designing the user interface",
//       "Managing the database",
//       "Handling both front-end and back-end development",
//       "Creating marketing strategies"
//     ],
//     "answer": 3
//   },
//   {
//     "question": "Which of the following technologies is most commonly used for front-end development?",
//     "options": [
//       "Node.js",
//       "React.js",
//       "MongoDB",
//       "Python"
//     ],
//     "answer": 2
//   }
// ]
// `;

//   try {
//     const result = await model.generateContent(prompt);
//     const response = result.response;
//     let text = response.text();

//     // Remove any markdown formatting if present
//     text = text.replace(/```json\n|\n```/g, '').trim();

//     // Parse the JSON string to an object
//     const mcqArray = JSON.parse(text);

//     return mcqArray;
//   } catch (error) {
//     console.error("Error generating MCQs:", error);
//     throw new Error("Failed to generate MCQs");
//   }
// }




// import { v } from "convex/values";
// import { mutation } from "./_generated/server";

// // Define the type for the items in mcq
// type MCQItem = {
//   answer: string | number;
//   options: string[];
//   question: string;
// };

// export const push_mcq = mutation({
//   args: {
//     userId: v.string(),
//     jobTitle: v.string(),
//     jobDescription: v.string(),
//     resume: v.string(),
//     difficulty: v.string(),
//     companyName: v.string(),
//   },
//   handler: async (ctx, args) => {
//     try {
//       const mcq = await generateMCQ(
//         args.jobTitle,
//         args.jobDescription,
//         args.resume,
//         args.difficulty,
//         args.companyName
//       );

//       const formattedMCQ = mcq.map((item: MCQItem) => ({
//         answer: String(item.answer),
//         options: item.options,
//         question: item.question
//       }));

//       const newTestId = await ctx.db.insert("Test", {
//         userId: args.userId,
//         date: new Date().toISOString(),
//         QuestionSet: formattedMCQ,
//       });

//       return newTestId;
//     } catch (error) {
//       console.error("Error in push_mcq mutation:", error);
//       throw new Error("Failed to generate and store MCQs");
//     }
//   }
// });


import { action } from "./_generated/server";
import { v } from "convex/values";
import { GoogleGenerativeAI } from "@google/generative-ai";


export const generateMCQ = action({
  args: {
    jobTitle: v.string(),
    jobDescription: v.string(),
    resume: v.string(),
    difficulty: v.string(),
    companyName: v.string(),
  },
  handler: async (ctx, args) => {
    const genAI = new GoogleGenerativeAI('AIzaSyBK1edzaiNbCD3ngi7OL2yX-z3XqBjKuG4');
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `

Given the following context, which includes the candidate's resume, the job description, and the job title, generate a set of 10 to 20 multiple-choice questions (MCQs). Each MCQ should consist of:

1. A question related to the skills, qualifications, or experience required for the job, ensuring relevance to the candidate's resume and the job description.
2. An array of four possible answer options, where one is correct.
3. The correct answer's index number (starting from 1).

Additionally, each question should be designed to help evaluate the candidate's suitability for the role by assessing their knowledge, skills, and experiences as detailed in their resume and the job requirements.


      Job Title: ${args.jobTitle}

      Company Name: ${args.companyName}

      Job Description: 
      ${args.jobDescription}

      User's Resume: 
      ${args.resume}

      difficulty level:
      ${args.difficulty}

      Please provide the output in the following JSON format without any additional formatting or markdown:

      [
        {
          "question": "What is the primary responsibility of a Full Stack Developer?",
          "options": [
            "Designing the user interface",
            "Managing the database",
            "Handling both front-end and back-end development",
            "Creating marketing strategies"
          ],
          "answer": 3
        },
        {
          "question": "Which of the following technologies is most commonly used for front-end development?",
          "options": [
            "Node.js",
            "React.js",
            "MongoDB",
            "Python"
          ],
          "answer": 2
        }
      ]
    `;

    try {
      const result = await model.generateContent(prompt);
      const response = result.response;
      let text = response.text();

      // Remove any markdown formatting if present
      text = text.replace(/```json\n|\n```/g, '').trim();

      // Parse the JSON string to an object
      const mcqArray = JSON.parse(text);

      return mcqArray;
    } catch (error) {
      console.error("Error generating MCQs:", error);
      throw new Error("Failed to generate MCQs");
    }
  },
});


// //////////////////////////////////

import { mutation } from "./_generated/server";

type MCQItem = {
  answer: string | number;
  options: string[];
  question: string;
};

export const push_mcq = mutation({
  args: {
    userId: v.string(),
    mcqArray: v.array(
      v.object({
        answer: v.union(v.string(), v.number()),
        options: v.array(v.string()),
        question: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    try {
      const formattedMCQ = args.mcqArray.map((item: MCQItem) => ({
        answer: String(item.answer),
        options: item.options,
        question: item.question
      }));

      const newTestId = await ctx.db.insert("Test", {
        userId: args.userId,
        date: new Date().toISOString(),
        QuestionSet: formattedMCQ,
      });

      return newTestId;
    } catch (error) {
      console.error("Error in push_mcq mutation:", error);
      throw new Error("Failed to store MCQs");
    }
  }
});