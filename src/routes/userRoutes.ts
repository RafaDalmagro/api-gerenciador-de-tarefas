import { Router } from "express";
import { UsersController } from "@/controllers/UsersController";
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticate";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const usersRoutes = Router();
const usersController = new UsersController();

usersRoutes.post("/", usersController.create);
usersRoutes.get(
    "/",
    ensureAuthenticated,
    verifyUserAuthorization(["admin"]),
    usersController.index
);
usersRoutes.get(
    "/:id",
    ensureAuthenticated,
    verifyUserAuthorization(["admin"]),
    usersController.show
);
usersRoutes.put(
    "/:id",
    ensureAuthenticated,
    verifyUserAuthorization(["admin"]),
    usersController.update
);
usersRoutes.delete(
    "/:id",
    ensureAuthenticated,
    verifyUserAuthorization(["admin"]),
    usersController.delete
);

export { usersRoutes };
