import { Router } from "express";
import { TeamsController } from "@/controllers/TeamsController";
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticate";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const teamsRoutes = Router();
const teamsController = new TeamsController();

teamsRoutes.get("/", ensureAuthenticated, verifyUserAuthorization, teamsController.index);
teamsRoutes.post("/", ensureAuthenticated, verifyUserAuthorization, teamsController.create);

export { teamsRoutes };
