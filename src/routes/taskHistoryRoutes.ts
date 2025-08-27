import { Router } from "express";
import { TaskHistoryController } from "@/controllers/TasksHistoryController";

const taskHistoryRoutes = Router();
const taskHistoryController = new TaskHistoryController();

taskHistoryRoutes.get("/", taskHistoryController.index);
taskHistoryRoutes.post("/", taskHistoryController.create);

export { taskHistoryRoutes };
