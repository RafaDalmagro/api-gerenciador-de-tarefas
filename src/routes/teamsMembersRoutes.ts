import { Router } from "express";
import { TeamsMembersController } from "@/controllers/TeamsMembersController";
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticate";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const teamsMembersRoutes = Router();
const teamsMembersController = new TeamsMembersController();

teamsMembersRoutes.use(ensureAuthenticated);
teamsMembersRoutes.get(
    "/",
    verifyUserAuthorization(["admin"]),
    teamsMembersController.index
);
teamsMembersRoutes.post(
    "/",
    verifyUserAuthorization(["admin"]),
    teamsMembersController.create
);

export { teamsMembersRoutes };
