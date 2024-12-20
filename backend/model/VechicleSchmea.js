const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    vehicle_id: {
      type: String,
      required: true,
      unique: true,
    },
    operator_id:{
      type: String,
      required: true,
    },
    gross_weight: {
      type: Number,
    },

    payload_in_tones: {
      type: Number,
    },
    truck_make: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    maximum_payload: {
      type: Number,
      required: true,
    },
    avg_tyre_pressure: {
      type: Number,
      required: true,
    },
    max_tyre_pressure: {
      type: Number,
      required: true,
    },
    min_tyre_pressure: {
      type: Number,
      required: true,
    },
    standard_tkph: {
      type: Number,
      required: true,
    },
    gps_coords: {
      type: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
      },
      required: true,
    },
    avg_speed_per_shift: {
      type: Number,
      default: 0,
    },
    current_speed: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["driving", "rest"],
      default: "rest",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);
