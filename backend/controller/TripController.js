const TripSchmea = require("../model/TripSchmea");
const VechicleSchmea = require("../model/VechicleSchmea");


const getTripsById = async (req, res) => {
  const { vehicle_id } = req.params;

  const Data = await TripSchmea.find({ vehicle_id: vehicle_id }).sort({
    startTime: -1,
  });

  return res.json(Data).status(200);
};

const calculateTKPHforTrip = async (vehicle_id) => {

  console.log(vehicle_id);
   console.log("inside the trips");
   
  const vehicleData = await VechicleSchmea.findOne({ vehicle_id: vehicle_id });
  console.log(vehicleData);

  

  const payload = vehicleData.payload_in_tones;
  const maxPayload = vehicleData.maximum_payload;
  const grossWeight = vehicleData.gross_weight;

  const vehicleWeight = Math.round(Number(grossWeight) - Number(maxPayload), 2);

  // Vehicle weight after loading
  const loadedTruckWeight = Math.round(vehicleWeight + Number(payload), 2);

  // Load distribution percentages
  const frontAxleEmptyPercent = 45 / 100;
  const rearAxleEmptyPercent = 55 / 100;
  const frontAxleLoadedPercent = 35 / 100;
  const rearAxleLoadedPercent = 65 / 100;

  // Load on front and rear tires (empty and loaded conditions)
  const frontAxleLoadEmpty = Math.round(
    vehicleWeight * frontAxleEmptyPercent,
    2
  );
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
  const roundTripDistance = 14; // km
  const noOfRoundTrips = 15; // cycles
  const workingShift = 8; // hours
  const awss = Math.round(
    (roundTripDistance * noOfRoundTrips) / workingShift,
    2
  );

  // Calculate TKPH for front and rear tires
  const frontTireTKPH = Math.round(meanFrontTireLoad * awss, 2);
  const rearTireTKPH = Math.round(meanRearTireLoad * awss, 2);

  const data = {
    frontTireTKPH,
    rearTireTKPH,
  };

  return data
};
const addTripsbyId = async (req, res) => {

  const { vehicle_id , data } = req.body;

  const newTrip = await new TripSchmea ({
        vehicle_id:vehicle_id,
        startTime: new Date().toISOString() ,
        startcordinates:{
          latitude:data.latitude,
          longitude:data.longitude
        },
        speed:data.speed,
        distance:data.distance,
        status:"started"
      })

    const vechicle  = await VechicleSchmea.findOne({ vehicle_id: vehicle_id });

    if(vehicle_id){
      vechicle.current_speed = data.speed;
    }
    await vechicle.save();
      await newTrip.save();
  return res.json({
    message: "Trip Added Succesfully",
  });
};

const updateStatusCompletion = async (req, res) => {
  const { _id, endcordinates } = req.body;
   
  const updated = await TripSchmea.findOne({ _id: _id });
   console.log("inside the update");
   
  updated.status = "COMPLETED";
  updated.endcordinates = await updated.save();
  const data = await calculateTKPHforTrip(updated.vehicle_id);
  console.log("data"+data);
  

  updated.frontTireTKPH = data.frontTireTKPH;
  updated.rearTireTKPH = data.rearTireTKPH; 
  await updated.save();

  return res.json(updated);
};


const getLatestTrip = async (req, res) => {
  const { vehicle_id } = req.params;
  const latestTrip = await TripSchmea.findOne({ vehicle_id: vehicle_id }).sort({
    startTime: -1,
  });
  return res.json(latestTrip);
};




module.exports = {
  getTripsById,
  addTripsbyId,
  updateStatusCompletion,
  getLatestTrip,
};
