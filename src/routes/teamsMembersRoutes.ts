import { Router } from "express";
import { TeamsMembersController } from "@/controllers/TeamsMembersController";

const teamsMembersRoutes = Router();
const teamsMembersController = new TeamsMembersController();

teamsMembersRoutes.get("/", teamsMembersController.index);
teamsMembersRoutes.post("/", teamsMembersController.create);

export { teamsMembersRoutes };
