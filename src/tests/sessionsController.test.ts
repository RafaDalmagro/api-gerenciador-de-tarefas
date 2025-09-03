import { app } from "@/app";
import request from "supertest";
import { prisma } from "../database/prisma";

describe("SessionsController", () => {
    let user_id: number;

    afterAll(async () => {
        await prisma.users.delete({
            where: {
                id: user_id,
            },
        });
    });

    it("Should authenticate an user and return a token", async () => {
        const userResponse = await request(app).post("/users").send({
            name: "Auth Teste User",
            email: "auth_teste@example.com",
            password: "12345678",
        });

        user_id = Number(userResponse.body.id);

        const sessionResponse = await request(app).post("/sessions").send({
            email: "auth_teste@example.com",
            password: "12345678",
        });

        expect(sessionResponse.status).toBe(201);
        expect(sessionResponse.body).toHaveProperty("token");
    });
});
