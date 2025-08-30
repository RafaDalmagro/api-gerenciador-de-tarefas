import { Request, Response, NextFunction } from "express";
import { authConfig } from "@/config/authConfig";
import { verify } from "jsonwebtoken";
import { AppError } from "@/utils/appError";

interface TokenPayload {
    role: string;
    sub: string;
}

function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw new AppError("JWT token is missing", 401);
        }

        const [, token] = authHeader.split(" ");

        const { role, sub: user_id } = verify(
            token,
            authConfig.jwt.secret
        ) as TokenPayload;

        req.user = {
            id: user_id,
            role,
        };

        return next();
    } catch (error) {
        throw new AppError("Invalid JWT token", 401);
    }
}

export { ensureAuthenticated };
