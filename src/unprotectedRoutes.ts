import Router from "@koa/router";
import { hospital, auth } from "./controller";

const unprotectedRouter = new Router();

// AuthRoutes
unprotectedRouter.post("/auth/login", auth.login);
unprotectedRouter.post("/auth/logout", auth.logout);

// HospitalRoutes
unprotectedRouter.post("/hospital", hospital.create);
unprotectedRouter.get("/hospital", hospital.findAll);
unprotectedRouter.get("/hospital/:id", hospital.findOne);
unprotectedRouter.delete("/hospital/:id", hospital.delete);

export { unprotectedRouter };
