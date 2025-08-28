import { Router } from "express";
import { TasksController } from "@/controllers/TasksController";

const tasksRoutes = Router();
const tasksController = new TasksController();

tasksRoutes.get("/", tasksController.index);
tasksRoutes.post("/", tasksController.create);
tasksRoutes.put("/:id", tasksController.update);
tasksRoutes.get("/:id", tasksController.show);
tasksRoutes.delete("/:id", tasksController.delete);

export { tasksRoutes };
