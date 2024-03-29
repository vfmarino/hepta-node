import Router from "@koa/router";
import { hospital,  setor,  user, plantao, motivo } from "./controller";

const protectedRouter = new Router();

// UserRoutes
protectedRouter.post("/users", user.create);
protectedRouter.post("/users/medico", user.createMedico);
protectedRouter.get("/users", user.findAll);
protectedRouter.get("/users/:id", user.findOne);
protectedRouter.delete("/users/:id", user.delete);

// HospitalRoutes
protectedRouter.post("/hospital", hospital.create);
protectedRouter.get("/hospital", hospital.findAll);
protectedRouter.get("/hospital/:id", hospital.findOne);
protectedRouter.delete("/hospital/:id", hospital.delete);

// SetoresRoutes
protectedRouter.get("/setores", setor.findAll);

// MotivosRoutes
protectedRouter.post("/motivos", motivo.create);
protectedRouter.get("/motivos", motivo.findAll);

//PlantaoRoutes
protectedRouter.post("/plantao", plantao.create);
protectedRouter.get("/plantao/relatorio", plantao.relatorioFinanceiro);
protectedRouter.get("/plantao", plantao.findAll);
protectedRouter.get("/plantaoByUser/:id", plantao.findAllByUser);
protectedRouter.get("/plantaoByStatus", plantao.findAllByStatus);
protectedRouter.put("/recolocarPlantao/:id/:dashBoardPlantoes", plantao.recolocarPlantaoById);
protectedRouter.put("/alteradoPlantao/:id/:dashBoardPlantoes", plantao.alteradoPlantaoById);
protectedRouter.get("/plantao/:id", plantao.findOne);
protectedRouter.delete("/plantao/:id", plantao.delete);


export { protectedRouter };
