const mongoose = require("mongoose")


const TkphHistorySchema = mongoose.Schema({
    vehicle_id: {
      type: String,
      required: true,
    },
    history: [
      {
        date: {
          type: Date,
          default: Date.now,
        },
        minTkph: {
          type: Number, // Assuming Tkph values are numeric
          required: true,
        },
        maxTkph: {
          type: Number, // Assuming Tkph values are numeric
          required: true,
        },
      },
    ],
  });
  
  module.exports = mongoose.model('TkphHistory', TkphHistorySchema);
  