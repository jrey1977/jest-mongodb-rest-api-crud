const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tripSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    destination: { type: String, required: true, maxlength: 15 },
    categoria: { type: String, enum: ["familiar", "amigos", "trabajo"] },
    start_date: { type: Date, required: true },
    end_date: { type: Date },
  },
  {
    // Para que se genere un campo created_at y updated_at
    timestamps: true,
  }
);

module.exports = mongoose.model("trip", tripSchema);