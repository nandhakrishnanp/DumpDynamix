const mongoose = require("mongoose");

const PressureHistorySchema = mongoose.Schema({
  tyre_id: {
    type: String,
    required: true,
    unique: true,
  },
  data: [
    {
      date: {
        type: String,
      },
      minPressure: {
        type: Number,
      },
      maxPressure:{
        type:Number
      }
    },
  ],
});

module.exports = mongoose.model("PressureHistory", PressureHistorySchema);
