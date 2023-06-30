require("dotenv").config();
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const util = require("./util");
const randomEmail = util.generateRandomEmail();

beforeAll(async () => {
  await mongoose
    .connect(process.env.MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connected to MongoDB");
    })
    .catch((error) => {
      console.error("failed to connect to MongoDB:", error);
    });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("User API", () => {
  describe(`POST ${util.path.signupPath}`, () => {
    it("should create a new user", async () => {
      const response = await request(app)
        .post(util.path.signupPath)
        .send({ email: randomEmail, password: "password" });

      expect(response.statusCode).toBe(201);
    });
  });

  describe(`POST ${util.path.loginPath}`, () => {
    it("should login the user", async () => {
      const response = await request(app)
        .post(util.path.loginPath)
        .send({ email: randomEmail, password: "password" });

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("token");
    });

    it("should return 401 if no email is provided", async () => {
      const response = await request(app)
        .post(util.path.loginPath)
        .send({ password: "password" });

      expect(response.statusCode).toBe(401);
    });
  });

  describe(`GET ${util.path.infoPath}`, () => {
    it("should return user info", async () => {
      const { token } = await util.generateTester();
      const response = await request(app)
        .get(util.path.infoPath)
        .set("Authorization", `Bearer ${token}`)
        .send();
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("user");
    });

    it("should return 401 if no token is provided", async () => {
      const response = await request(app).get(util.path.infoPath).send();
      expect(response.status).toBe(401);
    });
  });
});
