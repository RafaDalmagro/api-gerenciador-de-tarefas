import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/appError";
import { ZodError } from "zod";

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    if (err instanceof ZodError) {
        const issues = JSON.parse(err.message);

        return res
            .status(400)
            .json({ message: "Validation error", issues: issues[0].message });
    }

    return res.status(500).json({ message: err.message });
};
