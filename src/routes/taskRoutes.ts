import { Router } from "express";
import { TasksController } from "@/controllers/TasksController";
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticate";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";
import { verifyUserTeam } from "@/middlewares/verifyUserTeam";
import { verifyUserTask } from "@/middlewares/verifyUserTask";

const tasksRoutes = Router();
const tasksController = new TasksController();

tasksRoutes.use(ensureAuthenticated);

tasksRoutes.get(
    "/",
    verifyUserAuthorization(["admin", "member"]),
    tasksController.index
);
tasksRoutes.post(
    "/",
    verifyUserAuthorization(["admin"]),
    tasksController.create
);
tasksRoutes.put(
    "/:id",
    verifyUserAuthorization(["admin", "member"]),
    verifyUserTask,
    tasksController.update
);
tasksRoutes.get(
    "/:id",
    verifyUserAuthorization(["admin", "member"]),
    tasksController.show
);
tasksRoutes.delete(
    "/:id",
    verifyUserAuthorization(["admin"]),
    tasksController.delete
);

export { tasksRoutes };
