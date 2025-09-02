import { Request, Response, NextFunction } from "express";
import { prisma } from "@/database/prisma";
import { number, z } from "zod";
import { AppError } from "@/utils/appError";

class TeamsController {
    async index(req: Request, res: Response, next: NextFunction) {
        const teams = await prisma.teams.findMany({
            orderBy: { id: "asc" },
        });

        return res.status(200).json(teams);
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
        const paramsSchema = z.object({
            id: z.string(),
        });

        const bodySchema = z.object({
            name: z.string().min(2).max(100),
            description: z.string().min(10).max(500),
        });

        const { id } = paramsSchema.parse(req.params);
        const { name, description } = bodySchema.parse(req.body);

        const team = await prisma.teams.findUnique({
            where: { id: Number(id) },
        });

        if (!team) {
            throw new AppError("Team not found", 404);
        }

        const updatedTeam = await prisma.teams.update({
            where: { id: Number(id) },
            data: { name, description },
        });

        return res
            .status(200)
            .json({ previousTeam: team, updatedTeam: updatedTeam });
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        const paramsSchema = z.object({
            id: z.string(),
        });

        const { id } = paramsSchema.parse(req.params);

        const team = await prisma.teams.findUnique({
            where: { id: Number(id) },
        });

        if (!team) {
            throw new AppError("Team not found", 404);
        }

        const deletedTeam = await prisma.teams.delete({
            where: { id: Number(id) },
        });

        return res
            .status(200)
            .json({ message: "Team deleted successfully", team: deletedTeam });
    }
}

export { TeamsController };
