const mongoose = require("mongoose");

const maintenanceSchema = new mongoose.Schema({
  vehicle_id: {
    type: String,
    required: true,
  },
  maintenanceType: {
    type: String,
    enum: [
      "Routine Inspection",
      "Tread Depth Check",
      "Alignment/Rotation",
      "Puncture Repair",
      "Valve Replacement",
      "Sidewall Repair",
      "Retreading",
    ],
    required: true,
  },
  scheduledDate: {
    type: String,
    required: true,
  },
  assignedTeam: {
    type: String, 
    required: true,
  },
  status: {
    type: String,
    enum: ["Scheduled", "In Progress", "Completed", "Cancelled"],
    default: "Scheduled",
  },
  completionDate: {
    type: Date,
  },
  remarks: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Maintenance = mongoose.model("Maintenance", maintenanceSchema);

module.exports = Maintenance;
