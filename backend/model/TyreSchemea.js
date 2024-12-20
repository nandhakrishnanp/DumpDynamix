const mongoose = require("mongoose");

const tyreSchema = new mongoose.Schema(
  {
    vehicle_id: {
      type: String,
      required: true,
      ref: "Vehicle",
    },

    tyre_id: {
      type: String,
      required: true,
      unique: true,
    },
    km_drived: {
      type: Number,
      required: true,
    },
    tyre_position: {
      type: String,
      required: true,
    },
    tyre_pressure: {
      type: Number,
      required: true,
    },
    tyre_temperature: {
      type: Number,
      required: true,
    },
    tyre_status: {
      type: String,
      required: true,
    },
    tyre_health: {
      type: String,
      required: true,
    },
    tyre_make: {
      type: String,
      required: true,
    },
    tyre_model: {
      type: String,
      required: true,
    },
    tyre_size: {
      type: String,
      required: true,
    },
    tyre_tread_depth: {
      type: Number,
      required: true,
    },
    fixed_date: {
      type: Date,
      required: true,
    },
    last_inspection_date: {
      type: Date,
      required: true,
    },
    operating_hours: {
      type:Number,
      required:true
    },
    standard_psi :  {
      type: Number,
      required: true,
    },
    purchase_cost: {
      type: Number,
      required: true,
    },
    Miscellaneous_cost: {
      type: Number,
    },
    battery_Percentage :{
      type: Number,
    },
    pressure_history: [
      {
        date: {
          type: Date,
          required: true,
          default: Date.now,
        },
        pressure: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tyre", tyreSchema);
