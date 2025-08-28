import { Router } from "express";
import { TasksHistoryController } from "@/controllers/TasksHistoryController";

const tasksHistoryRoutes = Router();
const tasksHistoryController = new TasksHistoryController();

tasksHistoryRoutes.get("/", tasksHistoryController.index);
tasksHistoryRoutes.post("/", tasksHistoryController.create);

export { tasksHistoryRoutes };
