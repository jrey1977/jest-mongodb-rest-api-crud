const request = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");

describe("Pruebas sobre la api de trips", () => {
  beforeAll(async () => {
    await mongoose.connect(
      "mongodb+srv://mean_user:tPKSWqF26xBKLGt@cluster0.hvcxu.mongodb.net/familyTrips"
    );
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe("GET /api/trips", () => {
    let response;
    beforeEach(async () => {
      response = await request(app).get("/api/trips").send();
    });

    it("La ruta funciona", async () => {
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toContain("json");
    });

    it("La petición nos devuelve un array de trips", async () => {
      expect(response.body).toBeInstanceOf(Array);
    });
  });
});
