const VechicleSchmea = require ("../model/VechicleSchmea");

const calculateTKPH = async (req, res) => {
  const vehicle_id = req.params.vehicle_id;
  console.log(vehicle_id);

  const vehicleData = await VechicleSchmea.findOne({ vehicle_id: vehicle_id });
  console.log(vehicleData);

  if (!vehicleData) {
    return res.status(404).json({
      message: "No data found",
    });
  }

  const payload = vehicleData.payload_in_tones; 
  const maxPayload = vehicleData.maximum_payload; 
  const grossWeight = vehicleData.gross_weight;


  const vehicleWeight = Math.round(
    Number(grossWeight) - Number(maxPayload),
    2
  );

  // Vehicle weight after loading
  const loadedTruckWeight = Math.round(vehicleWeight + Number(payload), 2);

  // Load distribution percentages
  const frontAxleEmptyPercent = 45 / 100;
  const rearAxleEmptyPercent = 55 / 100;
  const frontAxleLoadedPercent = 35 / 100;
  const rearAxleLoadedPercent = 65 / 100;

  // Load on front and rear tires (empty and loaded conditions)
  const frontAxleLoadEmpty = Math.round(vehicleWeight * frontAxleEmptyPercent, 2);
  const rearAxleLoadEmpty = Math.round(vehicleWeight * rearAxleEmptyPercent, 2);
  const frontAxleLoadLoaded = Math.round(
    loadedTruckWeight * frontAxleLoadedPercent,
    2
  );
  const rearAxleLoadLoaded = Math.round(
    loadedTruckWeight * rearAxleLoadedPercent,
    2
  );

  // Load per tire (2 front tires, 4 rear tires)
  const frontTireLoadEmpty = frontAxleLoadEmpty / 2;
  const rearTireLoadEmpty = rearAxleLoadEmpty / 4;
  const frontTireLoadLoaded = frontAxleLoadLoaded / 2;
  const rearTireLoadLoaded = rearAxleLoadLoaded / 4;

  // Mean load per tire
  const meanFrontTireLoad = Math.round(
    (frontTireLoadEmpty + frontTireLoadLoaded) / 2,
    2
  );
  const meanRearTireLoad = Math.round(
    (rearTireLoadEmpty + rearTireLoadLoaded) / 2,
    2
  );

  // Calculate AWSS (Average Workshift Speed)
   const awss = vehicleData.avg_speed_per_shift;
  // Calculate TKPH for front and rear tires
  const frontTireTKPH = Math.round(meanFrontTireLoad * awss, 2);
  const rearTireTKPH = Math.round(meanRearTireLoad * awss, 2);

  const data = {
    vehicleWeight,
    loadedTruckWeight,
    maxPayload,
    frontAxleLoadEmpty,
    rearAxleLoadEmpty,
    frontAxleLoadLoaded,
    rearAxleLoadLoaded,
    frontTireLoadEmpty,
    rearTireLoadEmpty,
    frontTireLoadLoaded,
    rearTireLoadLoaded,
    meanFrontTireLoad,
    meanRearTireLoad,
    awss,
    frontTireTKPH,
    rearTireTKPH,
  };


  res.json({
    tkphData: data,
  });
};




module.exports = calculateTKPH;
