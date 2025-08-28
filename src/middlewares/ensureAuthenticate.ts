import { authConfig } from "@/config/authConfig";
import { verify } from "jsonwebtoken";
import { AppError } from "@/utils/appError";

interface TokenPayload {
    role: string;
    sub: string;
}

function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    try {
        return next();
    } catch (error) {
        throw new AppError("Invalid JWT token", 401);
    }
}

export { ensureAuthenticated };
