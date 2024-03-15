import request from "supertest";
import app from "../../server.js";
describe("Test user routes", () => {
  let authToken, token;

  // Test user registration
  //   1.Admin
  it("Register a new User", async () => {
    const res = await request(app).post("/api/v1/auth/register").send({
      email: "test@t.com",
      password: "123",
      role: "1",
    });
    expect(res.statusCode).toEqual(200);
  });
  //  2.User
  it("register a new user", async () => {
    const res = await request(app).post("/api/v1/auth/register").send({
      email: "test@test.test",
      password: "12345",
      role: "0",
    });
    expect(res.statusCode).toEqual(200);
  });

  // Test user login
  it("login test User", async () => {
    const res = await request(app).post("/api/v1/auth/login").send({
      email: "test@test.test",
      password: "12345",
    });
    expect(res.statusCode).toEqual(200);
    authToken = res.body.accessToken; // Save auth token for further requests
  });

  // // Test forgot password
  it("Forget password", async () => {
    const res = await request(app).post("/api/v1/auth/forget-password").send({
      email: "safayaparath@gmail.com",
      newPassword: "newpassword",
    });
    expect(res.statusCode).toEqual(200);
    token = res.body.token;
  });
});
