import { Request, Response, NextFunction } from "express";
import { prisma } from "@/database/prisma";
import { z } from "zod";
import { AppError } from "@/utils/appError";

class TasksController {
    async index(req: Request, res: Response, next: NextFunction) {
        if (!req.user) {
            return next(new AppError("User not authenticated", 401));
        }

        const userId = req.user.id;

        const memberships = await prisma.team_Members.findMany({
            where: { userId: Number(userId) },
            select: { teamId: true },
        });

        const teamIds = memberships.map((m) => m.teamId);

        if (teamIds.length === 0) {
            throw new AppError("User is not part of any team", 403);
        }

        const tasks = await prisma.tasks.findMany({
            where: {
                teamId: { in: teamIds },
            },
            select: {
                id: true,
                title: true,
                description: true,
                status: true,
                createdAt: true,
                updatedAt: true,
                user: { select: { name: true } },
                team: { select: { name: true } },
            },
            orderBy: { createdAt: "asc" },
        });

        return res.status(200).json({ tasks });
    }

    async create(req: Request, res: Response, next: NextFunction) {
        const bodySchema = z.object({
            title: z.string().min(3),
            description: z.string().min(5),
            assignedTo: z.int(),
            teamId: z.int(),
        });

        const { title, description, assignedTo, teamId } = bodySchema.parse(
            req.body
        );

        const task: Tasks = await prisma.tasks.create({
            data: {
                title,
                description,
                assignedTo,
                teamId,
            },
        });

        return res.status(201).json(task);
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const paramsSchema = z.object({
            id: z.string(),
        });

        const bodySchema = z.object({
            title: z.string().min(3).optional(),
            description: z.string().min(5).optional(),
            status: z.enum(["pending", "in_progress", "completed"]).optional(),
            assignedTo: z.int().optional(),
            teamId: z.int(),
        });

        const { id } = paramsSchema.parse(req.params);
        const { title, description, status, assignedTo, teamId } =
            bodySchema.parse(req.body);

        const taskPrevious = await prisma.tasks.findUnique({
            where: { id: Number(id) },
        });

        if (!taskPrevious) {
            throw new AppError("Task not found", 404);
        }

        const updatedTask = await prisma.tasks.update({
            where: { id: Number(id) },
            data: {
                title: title ?? taskPrevious.title,
                description: description ?? taskPrevious.description,
                status: status ?? taskPrevious.status,
                assignedTo: assignedTo ?? taskPrevious.assignedTo,
                teamId: teamId ?? taskPrevious.teamId,
            },
        });

        return res.status(200).json({ taskPrevious, updatedTask });
    }

    async show(req: Request, res: Response, next: NextFunction) {
        const paramsSchema = z.object({
            id: z.string(),
        });

        const { id } = paramsSchema.parse(req.params);

        const task = await prisma.tasks.findUnique({
            where: { id: Number(id) },
        });

        return res.status(200).json({ task });
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        const paramsSchema = z.object({
            id: z.string(),
        });

        const { id } = paramsSchema.parse(req.params);

        await prisma.tasks.delete({
            where: {
                id: Number(id),
            },
        });

        return res.status(204).json();
    }
}

export { TasksController };
