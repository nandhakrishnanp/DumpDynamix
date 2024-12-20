const Maintenance = require("../model/MaintanceModel");
const MaintenanceTeam = require("../model/MaintanceTeam");

const getMaintance = async (req, res) => {
  try {
    const maintance = await Maintenance.find();
    res.json(maintance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getmaintancebyTeamId = async (req, res) => {
  try {
    const maintance = await Maintenance.find({ team_id: req.params.team_id });
    res.json(maintance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMaintancebyDate = async (req, res) => {
  try {
    console.log("received", req.params.scheduledDate);
    const maintance = await Maintenance.find({
      scheduledDate: req.params.scheduledDate,
    }).sort({createdAt: -1});

    res.json(maintance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMaintanceTeamById = async (req, res) => {
  try {
    const id = req.params.id;
    const team = await  MaintenanceTeam.findOne({
        team_id: id,
    }).sort({createdAt: 1});
     
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllMaintanceTeam = async (req, res) => {
  try {
    const team = await MaintenanceTeam.find();
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const CreateMaintance = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const maintance = new Maintenance(data);
    await maintance.save();
    res.json({ status: "success" });
  } catch (error) {
    res.json({ status: error.message });
  }
};

module.exports = {
  getMaintance,
  getMaintancebyDate,
  getMaintanceTeamById,
  getAllMaintanceTeam,
  CreateMaintance,
  getmaintancebyTeamId
};
