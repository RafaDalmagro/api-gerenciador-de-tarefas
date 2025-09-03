import { Request, Response, NextFunction } from "express";
import { prisma } from "@/database/prisma";
import { z } from "zod";
import { AppError } from "@/utils/appError";

class TasksHistoryController {
    async create(req: Request, res: Response, next: NextFunction) {
        const bodySchema = z.object({
            taskId: z.string(),
            changedBy: z.string(),
            newStatus: z
                .enum(["pending", "in_progress", "completed"])
                .optional(),
        });

        const { taskId, changedBy, newStatus } = bodySchema.parse(req.body);

        if (!taskId || !changedBy || !newStatus) {
            return next(new AppError("Invalid data", 400));
        }

        const taskStatus = await prisma.tasks.findFirst({
            where: {
                id: Number(taskId),
            },
            select: {
                status: true,
            },
        });

        if (!taskStatus) {
            return next(new AppError("Task not found", 404));
        }

        await prisma.task_History.create({
            data: {
                taskId: Number(taskId),
                changedBy: Number(changedBy),
                oldStatus: taskStatus.status,
                newStatus,
            },
        });

        const taskHistory = await prisma.task_History.findUnique({
            where: {
                id: Number(taskId),
            },
            select: {
                id: true,
                newStatus: true,
            },
        });

        await prisma.tasks.update({
            where: {
                id: Number(taskId),
            },
            data: {
                status: newStatus,
            },
        });

        const newTaskStatus = await prisma.tasks.findUnique({
            where: {
                id: Number(taskId),
            },
            select: {
                id: true,
                status: true,
            },
        });

        return res.status(201).json({
            previousTaskHistory: taskHistory,
            newTaskStatus,
        });
    }
    async show(req: Request, res: Response, next: NextFunction) {
        const paramsSchema = z.object({
            id: z.string(),
        });

        const { id } = paramsSchema.parse(req.params);

        const taskHistory = await prisma.task_History.findMany({
            where: {
                taskId: Number(id),
            },
            select: {
                id: true,
                oldStatus: true,
                newStatus: true,
                changedBy: true,
                changedAt: true,
            },
        });

        if (!taskHistory) {
            return next(new AppError("Task history not found", 404));
        }

        if (taskHistory.length === 0) {
            return next(new AppError("This task doesn't have a history", 404));
        }

        return res.status(200).json(taskHistory);
    }
}

export { TasksHistoryController };
