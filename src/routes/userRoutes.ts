import { Router } from "express";
import { UserController } from "@/controllers/UsersController";

const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/", userController.create);
userRoutes.get("/", userController.index);

export { userRoutes };
