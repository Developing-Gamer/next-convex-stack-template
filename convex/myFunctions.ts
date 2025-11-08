import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Query to list all messages
export const listMessages = query({
  handler: async (ctx) => {
    return await ctx.db.query("messages").order("desc").take(10);
  },
});

// Mutation to send a new message
export const sendMessage = mutation({
  args: {
    text: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("messages", { text: args.text });
  },
});
