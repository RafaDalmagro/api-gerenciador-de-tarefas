import { Router } from "express";
import { TaskController } from "@/controllers/TasksController";

const taskRoutes = Router();
const taskController = new TaskController();

taskRoutes.get("/", taskController.index);
taskRoutes.post("/", taskController.create);
taskRoutes.put("/:id", taskController.update);
taskRoutes.get("/:id", taskController.show);
taskRoutes.delete("/:id", taskController.delete);

export { taskRoutes };
