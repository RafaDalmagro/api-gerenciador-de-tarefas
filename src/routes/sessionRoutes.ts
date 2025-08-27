import { Router } from "express";
import { SessionController } from "@/controllers/SessionsController";

const sessionRoutes = Router();
const sessionController = new SessionController();

sessionRoutes.get("/", sessionController.index);
sessionRoutes.post("/", sessionController.create);
sessionRoutes.put("/:id", sessionController.update);
sessionRoutes.get("/:id", sessionController.show);
sessionRoutes.delete("/:id", sessionController.delete);

export { sessionRoutes };
