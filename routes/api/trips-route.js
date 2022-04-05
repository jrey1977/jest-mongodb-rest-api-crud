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

module.exports = router;
