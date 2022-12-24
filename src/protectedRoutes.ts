import Router from "@koa/router";
import { user } from "./controller";

const protectedRouter = new Router();

// UserRoutes
protectedRouter.post("/users", user.create);
protectedRouter.post("/users/medico", user.createMedico);
protectedRouter.get("/users", user.findAll);
protectedRouter.get("/users/:id", user.findOne);
protectedRouter.delete("/users/:id", user.delete);

export { protectedRouter };
