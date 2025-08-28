import { Request, Response, NextFunction } from "express";
import { prisma } from "@/database/prisma";
import { hash } from "bcrypt";
import { z } from "zod";
import { AppError } from "@/utils/appError";

class UsersController {
    async index(req: Request, res: Response, next: NextFunction) {
        const users = await prisma.users.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        return res.status(200).json({ users });
    }

    async create(req: Request, res: Response, next: NextFunction) {
        const bodySchema = z.object({
            name: z.string().min(3),
            email: z.email("Invalid email format"),
            password: z
                .string()
                .min(8, "Password must be at least 8 characters long"),
        });

        const { name, email, password } = bodySchema.parse(req.body);

        const userWithSameEmail = await prisma.users.findFirst({
            where: {
                email,
            },
        });

        if (userWithSameEmail) {
            throw new AppError("Email already in use");
        }

        const hashedPassword = await hash(password, 8);

        const user: User = await prisma.users.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        return res.status(201).json(user);
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const bodySchema = z.object({
            name: z.string().min(3).optional(),
            role: z.enum(["admin", "member"]).optional(),
        });

        const paramsSchema = z.object({
            id: z.string(),
        });

        const { id } = paramsSchema.parse(req.params);
        const { name, role } = bodySchema.parse(req.body);

        const userBeforeUpdate = await prisma.users.findUnique({
            where: { id: Number(id) },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                updatedAt: true,
            },
        });

        if (!userBeforeUpdate) {
            throw new AppError("User not found", 404);
        }

        const userAfterUpdate: User = await prisma.users.update({
            data: { name, role },
            where: { id: Number(id) },
        });

        const { password, ...userWithoutPassword } = userAfterUpdate;

        return res
            .status(200)
            .json({ user: userWithoutPassword, previous: userBeforeUpdate });
    }

    async show(req: Request, res: Response, next: NextFunction) {
        const paramsSchema = z.object({
            id: z.string(),
        });
        const { id } = paramsSchema.parse(req.params);

        const user = await prisma.users.findUnique({
            where: {
                id: Number(id),
            },
        });

        const { password, ...userWithoutPassword } = user || {};

        return res.status(200).json(userWithoutPassword);
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        const paramsSchema = z.object({
            id: z.string(),
        });

        const { id } = paramsSchema.parse(req.params);

        const user = await prisma.users.delete({
            where: {
                id: Number(id),
            },
        });

        return res.status(204).json({ deleted: user });
    }
}

export { UsersController };
