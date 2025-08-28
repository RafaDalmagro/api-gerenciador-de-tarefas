import { Router } from "express";
import { TeamsController } from "@/controllers/TeamsController";

const teamsRoutes = Router();
const teamsController = new TeamsController();

teamsRoutes.get("/", teamsController.index);
teamsRoutes.post("/", teamsController.create);

export { teamsRoutes };
