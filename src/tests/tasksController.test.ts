import { app } from "@/app";
import request from "supertest";
import { prisma } from "../database/prisma";

describe("TaskController", () => {
    let user_id: number;
    let token: string;

    beforeAll(async () => {
        const userResponse = await request(app).post("/users").send({
            name: "Task Test User",
            email: "task_user@example.com",
            password: "12345678",
            role: "admin",
        });

        const sessionResponse = await request(app).post("/sessions").send({
            email: "task_user@example.com",
            password: "12345678",
        });
        user_id = Number(userResponse.body.id);
        token = sessionResponse.body.token;
    });

    afterAll(async () => {
        console.log("after", user_id);

        await prisma.users.delete({
            where: {
                id: user_id,
            },
        });
    });

    it("Should create a new task", async () => {
        const response = await request(app)
            .post("/tasks")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "Task Test",
                description: "This is a test task",
                assignedTo: 1,
                teamId: 1,
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
    });
});
