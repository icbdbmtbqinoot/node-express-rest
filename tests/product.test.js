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

describe("Product API", () => {
  describe(`GET ${util.path.productPath}`, () => {
    it("should get all products belonged to drawer", async () => {
      const drawer = await util.createTestDrawer(userId);

      const response = await request(app)
        .get(util.path.productPath)
        .set("Authorization", `Bearer ${globalToken}`)
        .query({ drawerId: drawer._id })
        .send();

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("products");
    });
  });

  describe(`PATCH ${util.path.productPath}/:id/like`, () => {
    it("should like a product and return 200 status code", async () => {
      const product = await util.getRandomProduct();
      const drawer = await util.createTestDrawer(userId);

      const response = await request(app)
        .patch(`${util.path.productPath}/${product.id}/like`)
        .set("Authorization", `Bearer ${globalToken}`)
        .send({ drawerName: drawer.name });

      expect(response.status).toBe(200);
    });
  });

  describe(`PATCH ${util.path.productPath}/:id/dislike`, () => {
    it("should dislike a product and return 200 status code", async () => {
      const product = await util.getRandomProduct();
      const drawer = await util.createTestDrawer(userId);

      const response = await request(app)
        .patch(`${util.path.productPath}/${product.id}/dislike`)
        .set("Authorization", `Bearer ${globalToken}`)
        .send({ drawerName: drawer.name });

      expect(response.status).toBe(200);
    });
  });
});
