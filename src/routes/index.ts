import { Router } from "express";
import { usersRoutes } from "@/routes/userRoutes";
import { tasksRoutes } from "@/routes/taskRoutes";
import { teamRoutes } from "@/routes/teamRoutes";
import { teamsMembersRoutes } from "@/routes/teamsMembersRoutes";
import { tasksHistoryRoutes } from "@/routes/taskHistoryRoutes";
import { sessionsRoutes } from "@/routes/sessionRoutes";

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);

routes.use("/tasks", tasksRoutes);
routes.use("/teams", teamRoutes);
routes.use("/teams-members", teamsMembersRoutes);
routes.use("/tasks-history", tasksHistoryRoutes);

export { routes };
