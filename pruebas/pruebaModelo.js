const mongoose = require("mongoose");
const Trip = require("./models/trip.model");

(async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://mean_user:tPKSWqF26xBKLGt@cluster0.hvcxu.mongodb.net/familyTrips"
    );

    const newTrip = await Trip.create({
      name: "Prueba de viaje",
      description: "Me lo he pasado bastante bien",
      destination: "Vigo",
      category: "amigos",
      start_date: "2022-05-02",
    });

    console.log("NewTrp:", newTrip);
  } catch (error) {
    console.log("Ha habido un error:", error);
  }
})();
