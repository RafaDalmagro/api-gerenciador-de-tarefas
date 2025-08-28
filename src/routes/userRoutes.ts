import { Router } from "express";
import { UserController } from "@/controllers/UsersController";

const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/", userController.create);
userRoutes.get("/", userController.index);
userRoutes.get("/:id", userController.show);
userRoutes.put("/:id", userController.update);
userRoutes.delete("/:id", userController.delete);

export { userRoutes };
