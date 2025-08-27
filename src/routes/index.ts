import { Router } from "express";
import { userRoutes } from "@/routes/userRoutes";
import { taskRoutes } from "./taskRoutes";
import { teamRoutes } from "./teamRoutes";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/tasks", taskRoutes);
routes.use("/teams", teamRoutes);

export { routes };
