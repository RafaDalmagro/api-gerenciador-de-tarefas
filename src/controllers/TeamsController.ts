import { Request, Response, NextFunction } from "express";
import { prisma } from "@/database/prisma";
import { z } from "zod";
import { AppError } from "@/utils/appError";

class TeamsController {
    async index(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json();
    }

    async create(req: Request, res: Response, next: NextFunction) {
        const bodySchema = z.object({
            name: z.string().min(2).max(100),
            description: z.string().min(10).max(500),
        });

        const { name, description } = bodySchema.parse(req.body);

        const team = await prisma.teams.create({
            data: {
                name,
                description,
            },
        });

        return res
            .status(200)
            .json({ message: "Team created successfully", team });
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

export { TeamsController };
