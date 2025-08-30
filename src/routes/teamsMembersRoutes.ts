import { Router } from "express";
import { TeamsMembersController } from "@/controllers/TeamsMembersController";
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticate";

const teamsMembersRoutes = Router();
const teamsMembersController = new TeamsMembersController();

teamsMembersRoutes.get("/", ensureAuthenticated, teamsMembersController.index);
teamsMembersRoutes.post(
    "/",
    ensureAuthenticated,
    teamsMembersController.create
);

export { teamsMembersRoutes };
