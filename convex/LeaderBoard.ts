import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const ensureLeaderboardEntry = mutation({
    args: { userId: v.string(), username: v.string() },
    handler: async (ctx, args) => {
        const { userId, username } = args;

        // Check if the user exists
        const existingUser = await ctx.db
            .query("leaderboard")
            .filter((q) => q.eq(q.field("userId"), userId))
            .first();

        if (!existingUser) {
            // User doesn't exist, create a new entry
            await ctx.db.insert("leaderboard", {
                userId,
                username,
                totalPoints: 0,
                totalAccuracy: 0
            });

            return "New leaderboard entry created for user";
        }

        return "Leaderboard entry already exists for user";
    },
});


import { query } from "./_generated/server";

export const getUserLeaderboardData = query({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        const { userId } = args;

        // Fetch the user's leaderboard data
        const userData = await ctx.db
            .query("leaderboard")
            .filter((q) => q.eq(q.field("userId"), userId))
            .first();

        if (userData) {
            // return { success: true, data: userData, message: "User data fetched successfully" };
            return userData
        } else {
            // return { success: false, message: "User not found in the leaderboard" };
            console.error("User not found in the leaderboard")
        }
    },
});





export const getTopUsers = query({
    handler: async (ctx) => {
        try {
            const topUsers = await ctx.db
                .query("leaderboard")
                .withIndex('byTotalPoints')
                .order("desc")
                .take(50) ; 

                return topUsers
                // return { success: true, data: topUsers, message: "Top 50 users fetched successfully" };
            } 
            catch (error) {
            console.error("Error fetching top users:", error);
            return { success: false, message: "An error occurred while fetching top users" };
        }
    }
});







export const getAllUsers = query({
    handler: async (ctx) => {
        try {
            const allUsers = await ctx.db
                .query("leaderboard")
                .withIndex('byTotalPoints')
                .order("desc")
                .collect();

            return allUsers
            // return { success: true, data: topUsers, message: "Top 50 users fetched successfully" };
        }
        catch (error) {
            console.error("Error fetching All users:", error);
            return { success: false, message: "An error occurred while fetching All users" };
        }
    }
});
