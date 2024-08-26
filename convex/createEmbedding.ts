import { v } from "convex/values";
import { action } from "./_generated/server";
import {getEmbeddings} from './openai'

export const createEmbedings = action({
    args: {
        search: v.string()
    },
    handler: async (ctx, args) => {
        const embedding = await getEmbeddings(args.search);
        return embedding;
    },
});