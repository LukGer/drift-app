import type { AppRouteHandler } from "@/lib/types";
import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import z from "zod";
import type { PostRoute } from "./expenses.routes";

export const post: AppRouteHandler<PostRoute> = async (c) => {
  const expense = c.req.valid("json");

  const result = streamObject({
    model: openai("gpt-3.5-turbo"),
    schema: z.object({
      tags: z.array(z.string()),
    }),
    prompt:
      "Generate a list of tags (max. 5, no pound sings just the text) for the following expense: " +
      JSON.stringify(expense),
  });

  c.header("X-Vercel-AI-Data-Stream", "v1");
  c.header("Content-Type", "text/plain; charset=utf-8");

  return result.toTextStreamResponse();
};
