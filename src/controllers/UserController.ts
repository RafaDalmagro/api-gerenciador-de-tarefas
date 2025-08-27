import { Request, Response, NextFunction } from "express";
import { prisma } from "@/database/prisma";
import { hash } from "bcrypt";
import { z } from "zod";
import { AppError } from "@/utils/appError";

class UserController {
    async index(req: Request, res: Response, next: NextFunction) {
        const users = await prisma.users.findMany();

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

        await prisma.users.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        return res.status(201).json();
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

export { UserController };
