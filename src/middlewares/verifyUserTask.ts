import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/appError";
import { prisma } from "@/database/prisma";

export async function verifyUserTask(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const user = req.user;
    const { id } = req.params;

    if (!user) {
        throw new AppError("User is not authorized", 401);
    }

    const isUserTask = await prisma.tasks.findFirst({
        where: {
            id: Number(id),
            assignedTo: Number(user.id),
        },
    });

    if (!isUserTask) {
        throw new AppError(`This is not your task, Task id: ${id}`, 401);
    }

    next();
}
