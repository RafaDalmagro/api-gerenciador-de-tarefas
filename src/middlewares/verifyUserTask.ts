import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/appError";
import { prisma } from "@/database/prisma";

export async function verifyUserTask(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const user = req.user;
    const { taskId } = req.params;

    if (!user) {
        throw new AppError("User is not authorized", 401);
    }

    const isUserTask = await prisma.tasks.findFirst({
        where: {
            id: Number(taskId),
            assignedTo: Number(user.id),
        },
    });

    if (!isUserTask) {  
        throw new AppError(`This is not your task, Task id: ${taskId}`, 401);
    }

    next();
}
