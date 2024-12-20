const Inspection = require("../model/InspectionSchmea");
const VechicleSchmea = require("../model/VechicleSchmea");

const getISOWeek = () => {
  const now = new Date();
  const year = now.getFullYear();
  const week = Math.ceil(
    ((now - new Date(year, 0, 1)) / 86400000 +
      new Date(year, 0, 1).getDay() +
      1) /
      7
  );
  return `${year}-W${week.toString().padStart(2, "0")}`;
};

const assignInspectiontoAll = async (req, res) => {
  try {
    const trucks = await VechicleSchmea.find();
    const week = getISOWeek();

    for (const truck of trucks) {
      const existingInspection = await Inspection.findOne({
        vehicle_id: truck.vehicle_id,
        week,
      });

      if (!existingInspection) {
        await new Inspection({
          vehicle_id: truck.vehicle_id,
          week,
          status: "Pending",
        }).save();
      }
    }

    res.status(200).json({ message: "Inspections assigned successfully." });
  } catch (error) {
    res.json({ error: error.message }).status(500);
  }
};

const getInspectionByVehicleId = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const inspections = await Inspection.find({ vehicle_id: vehicleId });

    if (!inspections) {
      return res.status(404).json({ error: "Inspections not found." });
    }

    res.json(inspections).status(200);
  } catch (error) {
    res.json({ error: "Failed to get inspections." }).status(500);
  }
};

const assignInspectionByVechicleId = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const week = getISOWeek();

    const existingInspection = await Inspection.findOne({
      vehicle_id: vehicleId,
      week,
    });

    if (!existingInspection) {
      await new Inspection({
        vehicle_id: vehicleId,
        week,
        status: "Pending",
      }).save();
    }

    res.status(200).json({ message: "Inspection assigned successfully." });
  } catch (error) {
    res.json({ error: error.message }).status(500);
  }
}

const completeInspection = async (req,res)=>{

  const {InspectionId  , images } = req.body;

  try {
    const inspection = await Inspection.findById(InspectionId);
    if(!inspection){
      return res.status(404).json({error: "Inspection not found."});
    }

    inspection.images = images;
    inspection.status = "Approved";
    await inspection.save();

    res.json({message: "Inspection completed successfully."}).status(200);

  }
  catch(error){
    res.json({error: "Failed to complete inspection."}).status(500);
  }


}

module.exports = {
  assignInspectiontoAll,
  getInspectionByVehicleId,
  completeInspection,
  assignInspectionByVechicleId
};
