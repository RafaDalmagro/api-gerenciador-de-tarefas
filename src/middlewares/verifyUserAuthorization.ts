import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/appError";

export function verifyUserAuthorization(role: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;

        if (!user) {
            throw new AppError("User is not authorized", 401);
        }

        if (!role.includes(user.role)) {
            throw new AppError("User is not authorized", 401);
        }

        next();
    };
}
