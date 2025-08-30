import { Router } from "express";
import { TasksHistoryController } from "@/controllers/TasksHistoryController";
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticate";

const tasksHistoryRoutes = Router();
const tasksHistoryController = new TasksHistoryController();

tasksHistoryRoutes.get("/", ensureAuthenticated, tasksHistoryController.index);
tasksHistoryRoutes.post(
    "/",
    ensureAuthenticated,
    tasksHistoryController.create
);

export { tasksHistoryRoutes };
