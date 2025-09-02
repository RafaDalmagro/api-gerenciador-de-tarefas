import { Request, Response, NextFunction } from "express";
import { prisma } from "@/database/prisma";
import { z } from "zod";
import { AppError } from "@/utils/appError";

class TeamsMembersController {
    async index(req: Request, res: Response, next: NextFunction) {
        const members = await prisma.team_Members.findMany({
            orderBy: { id: "asc" },
            select: {
                id: true,
                user: { select: { name: true } },
                team: { select: { name: true } },
            },
        });

        return res.status(200).json(members);
    }
    async create(req: Request, res: Response, next: NextFunction) {
        const bodySchema = z.object({
            userId: z.string(),
            teamId: z.string(),
        });

        const { userId, teamId } = bodySchema.parse(req.body);

        const user = await prisma.users.findUnique({
            where: { id: Number(userId) },
        });

        if (!user) {
            throw new AppError("User not found", 404);
        }

        const team = await prisma.teams.findUnique({
            where: { id: Number(teamId) },
        });

        if (!team) {
            throw new AppError("Team not found", 404);
        }

        const teamMember = await prisma.team_Members.create({
            data: {
                user: { connect: { id: Number(userId) } },
                team: { connect: { id: Number(teamId) } },
            },
        });

        return res
            .status(201)
            .json({ message: "User added to team successfully", teamMember });
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

export { TeamsMembersController };
