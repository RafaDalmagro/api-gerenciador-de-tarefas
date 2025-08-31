import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/appError";
import { prisma } from "@/database/prisma";

export async function verifyUserTeam(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const user = req.user;
    const { teamId } = req.body;

    if (!user) {
        throw new AppError("User is not authorized", 401);
    }

    const isMember = await prisma.team_Members.findFirst({
        where: {
            teamId: Number(teamId),
        },
    });

    if (!isMember) {
        throw new AppError(
            `Only team members can access this resource, Team id: ${teamId}`,
            401
        );
    }

    next();
}
