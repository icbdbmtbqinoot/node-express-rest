require("dotenv").config();
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const util = require("./util");
let userId, globalToken;

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
  const { user, token } = await util.generateTester();
  globalToken = token;
  userId = user._id;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Drawer API", () => {
  describe(`GET ${util.path.drawerPath}`, () => {
    it("should get all drawers belonged to user", async () => {
      const response = await request(app)
        .get(util.path.drawerPath)
        .set("Authorization", `Bearer ${globalToken}`)
        .send();

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("drawers");
    });
  });

  describe(`POST ${util.path.drawerPath}`, () => {
    const drawerName = "dup-drawer";

    it("should create drawer", async () => {
      const response = await request(app)
        .post(util.path.drawerPath)
        .set("Authorization", `Bearer ${globalToken}`)
        .send({ name: drawerName });

      expect(response.statusCode).toBe(201);
    });

    it("should return 400 if already used name", async () => {
      const response = await request(app)
        .post(util.path.drawerPath)
        .set("Authorization", `Bearer ${globalToken}`)
        .send({ name: drawerName });

      expect(response.statusCode).toBe(400);
    });

    it("should create drawer when different user tries same name", async () => {
      const { token } = await util.generateTester();
      const response = await request(app)
        .post(util.path.drawerPath)
        .set("Authorization", `Bearer ${token}`)
        .send({ name: drawerName });

      expect(response.statusCode).toBe(201);
    });
  });

  describe(`DELETE ${util.path.drawerPath}/:id`, () => {
    it("should delete drawer", async () => {
      const drawer = await util.createTestDrawer(userId);
      const response = await request(app)
        .delete(`${util.path.drawerPath}/${drawer.id}`)
        .set("Authorization", `Bearer ${globalToken}`)
        .send();

      expect(response.status).toBe(200);
    });
  });
});
