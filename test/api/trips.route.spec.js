const request = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");
const Trip = require("../../models/trip.model");

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

  describe("POST /api/trips", () => {
    const newTrip = {
      name: "Viaje de prueba",
      destination: "Berlin",
      category: "familiar",
      start_date: "2022-06-20",
    };

    const badTrip = {
      nombre: "Viaje que falla",
    };

    afterAll(async () => {
      await Trip.deleteMany({ name: "Viaje de prueba" });
    });

    it("La ruta funciona", async () => {
      const response = await request(app).post("/api/trips").send(newTrip);

      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toContain("json");
    });

    it("Se inserta correctamente", async () => {
      const response = await request(app).post("/api/trips").send(newTrip);

      expect(response.body._id).toBeDefined();
      expect(response.body.name).toBe(newTrip.name);
    });

    it("Error en la insercción", async () => {
      const response = await request(app).post("/api/trips").send(badTrip);

      expect(response.status).toBe(500);
      expect(response.body.error).toBeDefined;
    });
  });
});
