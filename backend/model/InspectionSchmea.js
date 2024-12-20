const mongoose = require('mongoose');

const InspectionSchema = new mongoose.Schema({
    vehicle_id: {
    type: String, 
    required: true,
  },
  week: {
    type: String, // ISO week format (e.g., '2024-W11')
    required: true,
  },
  images: [
    {
      url: { type: String }, 
      tyre_id: { type: String },
      description: { type: String }, 
      dateTaken: { type: Date, default: Date.now }, 
    },
  ],
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending', 
  },
  comments: {
    type: String, // Admin's comments about the inspection
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Inspection', InspectionSchema);
