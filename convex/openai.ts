// Create Embeddings

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI('AIzaSyBWxqgf4e8WodMr2uJw7zNyk6p7JhZprk0');


export async function getEmbeddings(text: string) {

    try {
        const model = genAI.getGenerativeModel({
            model: "text-embedding-004" // Removed options
        });
        const result = await model.embedContent(text);

        const data = result.embedding;
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}


// create MCQ questions

const genAI1 = new GoogleGenerativeAI("AIzaSyBWxqgf4e8WodMr2uJw7zNyk6p7JhZprk0");

const model = genAI1.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateMCQ = async (jobTitle: string, jobDescription: string, resume: string, difficulty: string, companyName:string) => {
    const prompt = `
Generate a set of 10 to 20 multiple-choice questions (MCQs) based on the given job title, job description, and the user's resume. Each MCQ should consist of the following:

1. A question related to the skills, qualifications, or experience required for the job.
2. An array of four possible answer options, where one is correct.
3. The correct answer's index number (starting from 1).

Job Title: ${jobTitle}

Company Name: ${companyName}

Job Description: 
${jobDescription}

User's Resume: 
${resume}

difficulty level:
${difficulty}

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

        // Validate the structure of the generated MCQs
        if (!Array.isArray(mcqArray) || mcqArray.length === 0) {
            throw new Error("Invalid MCQ format generated");
        }

        return mcqArray;
    } catch (error) {
        console.error("Error generating MCQs:", error);
        throw new Error("Failed to generate MCQs");
    }
}





// create Tags


const genAI2 = new GoogleGenerativeAI("AIzaSyBWxqgf4e8WodMr2uJw7zNyk6p7JhZprk0");

const model1 = genAI2.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateTags = async (questions: any[]) => {
    const prompt = `
Based on the following array of multiple-choice questions (MCQs), generate a list of three technical tags that best represent the overall content of the questions. The tags should be relevant to the technical concepts, skills, or technologies mentioned in the questions. The tags should be provided in an array format, with each tag being a concise and specific term.

Questions:
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

Please provide the output in the following JSON format without any additional text or formatting:

{
  "tags": ["Tag1", "Tag2", "Tag3"]
}

`;

    try {
        const result = await model1.generateContent(prompt);
        const response = result.response;
        let text = response.text();

        // Remove any markdown formatting if present
        text = text.replace(/```json\n|\n```/g, '').trim();

        // Parse the JSON string to an object
        const mcqArray = JSON.parse(text);

        // Validate the structure of the generated MCQs
        if (!Array.isArray(mcqArray) || mcqArray.length === 0) {
            throw new Error("Invalid Tags format generated");
        }

        return mcqArray;
    } catch (error) {
        console.error("Error generating Tags:", error);
        throw new Error("Failed to generate Tags");
    }
}