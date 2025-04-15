import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";

const tags = ["Tasks"];

export const post = createRoute({
  path: "/expenses/tag",
  method: "post",
  tags,
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            description: z.string(),
            amount: z.number(),
          }),
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: {
      description: "Success",
    },
  },
});

export type PostRoute = typeof post;
