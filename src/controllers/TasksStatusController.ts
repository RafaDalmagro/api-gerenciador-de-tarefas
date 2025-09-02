import { NextFunction, Request, Response } from "express";
import z from "zod";
import { prisma } from "@/database/prisma";

class TasksStatusController {
    async update(req: Request, res: Response, next: NextFunction) {
        const paramsSchema = z.object({
            id: z.string(),
        });

        const bodySchema = z.object({
            status: z.enum(["pending", "in_progress", "completed"]),
        });

        const { id } = paramsSchema.parse(req.params);
        const { status } = bodySchema.parse(req.body);

        await prisma.tasks.update({
            where: { id: Number(id) },
            data: { status },
        });

        return res.status(200).json();
    }
}

export { TasksStatusController };
