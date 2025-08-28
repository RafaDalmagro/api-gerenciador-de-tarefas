import { Request, Response, NextFunction } from "express";
import { prisma } from "@/database/prisma";
import { z } from "zod";
import { AppError } from "@/utils/appError";
import { compare } from "bcrypt";
import { authConfig } from "@/config/authConfig";
import jwt from "jsonwebtoken";

class SessionsController {
    async create(req: Request, res: Response, next: NextFunction) {
        const bodySchema = z.object({
            email: z.email("Invalid email format"),
            password: z
                .string()
                .min(8, "Password must be at least 8 characters long"),
        });

        const { email, password } = bodySchema.parse(req.body);

        const user = await prisma.users.findFirst({
            where: {
                email,
            },
        });

        if (!user) {
            throw new AppError("Invalid email or password", 401);
        }

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new AppError("Invalid email or password", 401);
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = jwt.sign({ role: user.role ?? "member" }, secret, {
            subject: String(user.id),
            expiresIn,
        });

        const { password: hashedPassword, ...userWithoutPassword } = user;

        return res.status(201).json({ token, user: userWithoutPassword });
    }
}

export { SessionsController };
