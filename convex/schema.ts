// import { v } from "convex/values";

// export default defineSchema({
//         messages: defineTable({
//                 author: v.string(),
//                 body: v.string(),
//             }),
//         });

//         convex/schema.ts
//         import { defineSchema, defineTable, s } from "convex/schema";



//main schema working -1 
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
// export default defineSchema({
//     cards: defineTable({
//         difficultyLevel: v.string(), // One of "Easy", "Medium", "Hard"
//         companyName: v.string(),     // Example: "Google", "Facebook", etc.
//         jobTitle: v.string(),       // Example: "Data Scientist", "Software Engineer", etc.
//         technicalTags: v.array(v.string()), // Example: ["Python", "Java", "C++"], max 3 elements
//         numberOfQuestions: v.number(), // Number of questions between 10-20
//     }),
// });











// import { defineSchema, defineTable } from "convex/server";





// import { v } from "convex/values";

export default defineSchema({
    cards: defineTable({
        difficultyLevel: v.string(),
        companyName: v.string(),
        jobTitle: v.string(),
        technicalTags: v.array(v.string()),
        numberOfQuestions: v.number(),
        embedding: v.array(v.float64()), // Add this line
    }).vectorIndex("by_embedding", {
        vectorField: "embedding",
        dimensions: 1536, // Adjust based on your embedding model
        filterFields: ["difficultyLevel", "companyName", "jobTitle", "numberOfQuestions"],
    }),
});