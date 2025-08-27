import { Request, Response, NextFunction } from "express";
import { prisma } from "@/database/prisma";
import { z } from "zod";
import { AppError } from "@/utils/appError";

class TeamController {
    async index(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json();
    }

    async create(req: Request, res: Response, next: NextFunction) {
        const bodySchema = z.object({
            name: z.string().min(2).max(100),
            description: z.string().min(10).max(500),
        });

        const { name, description } = bodySchema.parse(req.body);

        return res.status(200).json({ name, description });
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

export { TeamController };
