import { Router } from "express";
import { TeamController } from "@/controllers/TeamsController";

const teamRoutes = Router();
const teamController = new TeamController();

teamRoutes.get("/", teamController.index);
teamRoutes.post("/", teamController.create);

export { teamRoutes };
