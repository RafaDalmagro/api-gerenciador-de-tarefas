import { app } from "@/app";
import request from "supertest";

describe("UsersController", () => {
    test("Should log a message", () => {
        console.log("opa fiao");
    });

    // it("Should list users", async () => {
    //     const response = await request(app).get("/users");
    //     console.log(response.body);

    //     expect(response.status).toBe(200);
    //     expect(response.body).toEqual(expect.arrayContaining([expect.objectContaining({
    //         id: expect.any(String),
    //         name: expect.any(String),
    //         email: expect.any(String),
    //     })]));
    // });
});
