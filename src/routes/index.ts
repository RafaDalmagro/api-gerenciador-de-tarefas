import { Router } from "express";
import { userRoutes } from "@/routes/userRoutes";
import { taskRoutes } from "@/routes/taskRoutes";
import { teamRoutes } from "@/routes/teamRoutes";
import { teamsMembersRoutes } from "@/routes/teamsMembersRoutes";
import { taskHistoryRoutes } from "@/routes/taskHistoryRoutes";
import { sessionRoutes } from "@/routes/sessionRoutes";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/sessions", sessionRoutes);

routes.use("/tasks", taskRoutes);
routes.use("/teams", teamRoutes);
routes.use("/teams-members", teamsMembersRoutes);
routes.use("/task-history", taskHistoryRoutes);

export { routes };
