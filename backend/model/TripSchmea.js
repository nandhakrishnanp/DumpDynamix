const mongoose = require("mongoose");

const tripSchmea = mongoose.Schema({
  vehicle_id: {
    type: String,
  },
  date: {
    type: String,
  },
  startTime: {
    type: String,
  },
  endTime: {
    type: String,
  },
  startcordinates: {
    latitude: {
      type: String,
    },
    longitude: {
      type: String,
    },
  },
  endcordinates: {
    latitude: {
      type: String,
    },
    longitude: {
      type: String,
    },
  },
  payload: {
    type: Number,
    default: 0,
  },
  frontTireTKPH: {
    type: Number,
  },
  rearTireTKPH: {
    type: Number,
  },
  status: {
    type: String,
  },
  maxpayload: {
    type: Number,
  },
  distance: {
    type: Number,
  },
  speed: {
    type: Number,
  },
});

module.exports = mongoose.model("Trips", tripSchmea);
