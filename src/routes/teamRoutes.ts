import { Router } from "express";
import { TeamsController } from "@/controllers/TeamsController";
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticate";
const teamsRoutes = Router();
const teamsController = new TeamsController();

teamsRoutes.get("/", ensureAuthenticated, teamsController.index);
teamsRoutes.post("/", ensureAuthenticated, teamsController.create);

export { teamsRoutes };
