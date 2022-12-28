import Router from "@koa/router";
import { hospital, auth, plantao } from "./controller";

const unprotectedRouter = new Router();

// AuthRoutes
unprotectedRouter.post("/auth/login", auth.login);
unprotectedRouter.post("/auth/logout", auth.logout);

// HospitalRoutes
unprotectedRouter.post("/hospital", hospital.create);
unprotectedRouter.get("/hospital", hospital.findAll);
unprotectedRouter.get("/hospital/:id", hospital.findOne);
unprotectedRouter.delete("/hospital/:id", hospital.delete);

// PlantaoRoutes
unprotectedRouter.post("/plantao", plantao.create);
unprotectedRouter.get("/plantao", plantao.findAll);
unprotectedRouter.get("/plantao/:id", plantao.findOne);
unprotectedRouter.delete("/plantao/:id", plantao.delete);

export { unprotectedRouter };
