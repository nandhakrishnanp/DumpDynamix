const mongoose = require("mongoose");

const dumpTruckTyreSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
    trim: true,
  },
  model: {
    type: String,
    required: true,
    trim: true,
  },
  size: {
    type: String,
    required: true,
    trim: true, 
  },
  type: {
    type: String,
    enum: ["Radial", "Bias", "Solid", "Pneumatic"],
    required: true,
  },
  loadCapacity: {
    type: Number,
    required: true, 
    min: 0,
  },
  plyRating: {
    type: Number,
    required: true, 
    min: 0,
  },
  treadPattern: {
    type: String,
    required: true, 
  },
  application: {
    type: String,
    enum: ["Mining", "Construction", "Quarry", "Industrial"],
   default: "Mining",
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  quantityInStock: {
    type: Number,
    required: true,
    min: 0,
  },
  manufactureDate: {
    type: Date,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  supplier: {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    contact: {
      type: String,
      required: true,
      trim: true,
    },
  },
  compatibility: {
    truckModels: [
      {
        type: String,
    
      },
    ],
  },
  notes: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});




module.exports = mongoose.model("DumpTruckTyre", dumpTruckTyreSchema);;
