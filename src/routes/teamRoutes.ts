import { Router } from "express";
import { TeamsController } from "@/controllers/TeamsController";
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticate";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const teamRoutes = Router();
const teamController = new TeamsController();

teamRoutes.get(
    "/",
    ensureAuthenticated,
    verifyUserAuthorization(["admin"]),
    teamController.index
);
teamRoutes.post(
    "/",
    ensureAuthenticated,
    verifyUserAuthorization(["admin"]),
    teamController.create
);
teamRoutes.put(
    "/:id",
    ensureAuthenticated,
    verifyUserAuthorization(["admin"]),
    teamController.update
);

teamRoutes.delete(
    "/:id",
    ensureAuthenticated,
    verifyUserAuthorization(["admin"]),
    teamController.delete
);

export { teamRoutes };
