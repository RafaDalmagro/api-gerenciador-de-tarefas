import { z } from "zod";

const envSchema = z.object({
    JWT_SECRET: z.string(),
    DATABASE_URL: z.string().url(),
    PORT: z.coerce.number().default(3000),
    POSTGRES_USER: z.string(),
    POSTGRES_PASSWORD: z.string(),
    POSTGRES_DB: z.string(),
});

export const env = envSchema.parse(process.env);
