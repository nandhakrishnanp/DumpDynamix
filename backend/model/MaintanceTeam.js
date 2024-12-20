const mongoose = require("mongoose");

const maintenanceTeamSchema = new mongoose.Schema({
  team_id: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  members: [
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      role: {
        type: String,
        enum: ["Technician", "Supervisor", "Manager"],
        default: "Technician",
      },
      contact: {
        type: String,
        required: true,
      },
      
      email: {
        type: String,
        required: true,
      },
      password :{
        type:String ,
        required:true
      }
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const MaintenanceTeam = mongoose.model("MaintenanceTeam", maintenanceTeamSchema);

module.exports = MaintenanceTeam;
