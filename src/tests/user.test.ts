import { app } from "@/app";
import request from "supertest";

describe("UsersController", () => {
    it("Should create a new User", async () => {
        const response = await request(app).post("/users").send({
            name: "Teste",
            email: "test@example.com",
            password: "12345678",
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.name).toBe("Teste");
    });
});
