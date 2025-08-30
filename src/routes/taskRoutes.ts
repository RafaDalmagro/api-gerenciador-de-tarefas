import { Router } from "express";
import { TasksController } from "@/controllers/TasksController";
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticate";

const tasksRoutes = Router();
const tasksController = new TasksController();

tasksRoutes.get("/", ensureAuthenticated, tasksController.index);
tasksRoutes.post("/", ensureAuthenticated, tasksController.create);
tasksRoutes.put("/:id", ensureAuthenticated, tasksController.update);
tasksRoutes.get("/:id", ensureAuthenticated, tasksController.show);
tasksRoutes.delete("/:id", ensureAuthenticated, tasksController.delete);

export { tasksRoutes };
