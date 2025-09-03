import { app } from "@/app";
import request from "supertest";
import { prisma } from "../database/prisma";

describe("UsersController", () => {
    let user_id: number;

    afterAll(async () => {
        await prisma.users.delete({
            where: {
                id: user_id,
            },
        });
    });

    it("Should create a new User", async () => {
        const response = await request(app).post("/users").send({
            name: "Teste",
            email: "teste@example.com",
            password: "12345678",
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.name).toBe("Teste");

        user_id = Number(response.body.id);
    });

    it("Should throw an error if email already exists", async () => {
        const response = await request(app).post("/users").send({
            name: "Teste",
            email: "teste@example.com",
            password: "12345678",
        });

        expect(response.status).toBe(400);
        expect(response.body.message).toEqual("Email already in use");
    });

    it("Should throw an validation error from invalid email", async () => {
        const response = await request(app).post("/users").send({
            name: "Teste",
            email: "invalid-email",
            password: "12345678",
        });
        console.log(response.body);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message");
        expect(response.body).toHaveProperty("issues");
        expect(response.body.message).toBe("Validation error");
        expect(response.body.issues).toEqual("Invalid email format");
    });
});
