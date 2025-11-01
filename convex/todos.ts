import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getTodos = query({
  handler: async (ctx) => {
    return await ctx.db.query("todos").collect();
  },
});

export const addTodo = mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert("todos", {
      text: args.text,
      iscompleted: false,
    });
  },
});

export const deleteTodo = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const toggleTodo = mutation({
  args: { id: v.id("todos"), iscompleted: v.boolean() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { iscompleted: args.iscompleted });
  },
});

export const editTodo = mutation({
  args: { id: v.id("todos"), newText: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { text: args.newText });
  },
});

export const clearAll = mutation({
  handler: async (ctx) => {
    const all = await ctx.db.query("todos").collect();
    for (const todo of all) {
      await ctx.db.delete(todo._id);
    }
  },
});
