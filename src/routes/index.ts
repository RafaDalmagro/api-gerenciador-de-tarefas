import { Router } from "express";
import { userRoutes } from "@/routes/userRoutes";
import { taskRoutes } from "./taskRoutes";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/tasks", taskRoutes);

export { routes };
