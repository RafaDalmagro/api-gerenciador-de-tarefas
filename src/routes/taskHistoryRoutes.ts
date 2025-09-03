import { Router } from "express";
import { TasksHistoryController } from "@/controllers/TasksHistoryController";
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticate";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const tasksHistoryRoutes = Router();
const tasksHistoryController = new TasksHistoryController();

tasksHistoryRoutes.get(
    "/:id/history",
    ensureAuthenticated,
    verifyUserAuthorization(["admin", "member"]),
    tasksHistoryController.show
);
tasksHistoryRoutes.post(
    "/",
    ensureAuthenticated,
    verifyUserAuthorization(["admin"]),
    tasksHistoryController.create
);

export { tasksHistoryRoutes };
