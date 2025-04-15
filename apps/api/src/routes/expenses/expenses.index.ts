import { createRouter } from "@/lib/create-app";

import * as handlers from "./expenses.handlers";
import * as routes from "./expenses.routes";

const router = createRouter().openapi(routes.post, handlers.post);

export default router;
