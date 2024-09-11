import { query } from "./_generated/server";
import { v } from "convex/values";

export const getTestHistoryById = query({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        const TestHistory = await ctx.db
            .query("TestAnswer")
            .filter((q) => q.eq(q.field("userId"), args.userId))
            .collect();
        return TestHistory;
    },
});