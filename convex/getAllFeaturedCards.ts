
import { query } from "./_generated/server";
import { v } from "convex/values";

export const getAllFeaturedCards = query({
    handler: async (ctx) => {
        try {
            const cards = await ctx.db.query("cards").collect();

            if (!cards || cards.length === 0) {
                console.log("No cards found in the database");
                return [];
            }

            console.log(`Retrieved ${cards.length} cards from the database`);
            return cards;
        } catch (error: any) {
            console.error("Error in getAllFeaturedCards query:", error);
            throw new Error(`Failed to retrieve Featured cards: ${error.message}`);
        }
    },
});