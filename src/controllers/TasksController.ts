import { Request, Response, NextFunction } from "express";
import { prisma } from "@/database/prisma";
import { z } from "zod";
import { AppError } from "@/utils/appError";

class TasksController {
    async index(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json({ message: "Index" });
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

        // const task: Tasks = await prisma.tasks.create({
        //     data: {
        //         title,
        //         description,
        //         assignedTo,
        //         teamId,
        //         status: "pending",
        //         priority: "medium",
        //     },
        // });

        const task: Tasks = {
            title,
            description,
            assignedTo,
            teamId,
            status: "pending",
            priority: "medium",
        };

        return res.status(201).json(task);
    }

    async update(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json({ message: "Update" });
    }

    async show(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json({ message: "Show" });
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        return res.status(204).json({ message: "Delete" });
    }
}

export { TasksController };
