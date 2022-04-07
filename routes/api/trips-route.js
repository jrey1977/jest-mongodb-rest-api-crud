const router = require("express").Router();
const Trip = require("../../models/trip.model");

router.get("/", async (req, res) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (error) {
    res.status(500).json({
      error: "Ha ocurrido un error",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const newTrip = await Trip.create(req.body);
    res.json(newTrip);
  } catch (error) {
    res.status(500).json({ error: "Ha ocurrido un error" });
  }
});

module.exports = router;
