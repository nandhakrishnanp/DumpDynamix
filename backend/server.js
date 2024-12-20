const express = require("express");
const app = express();
const port = 3000;
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();


const admin = require("firebase-admin");
const serviceAccount = require("./firebase/ServiceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const VechicleSchmea = require("./model/VechicleSchmea");
const cors = require("cors");
const TkphHistory = require("./model/TkphHistory");
const OperatorSchmea = require("./model/OperatorSchmea");
const TyreSchemea = require("./model/TyreSchemea");
const sendNotification = require("./firebase/Notification");
const AdminSchmea = require("./model/AdminSchmea");
const Notification = require("./model/NotificationRoute");
const TripSchmea = require("./model/TripSchmea");
const MaintenanceTeam = require("./model/MaintanceTeam");
const Maintenance = require("./model/MaintanceModel");


app.use(cors());
app.use(express.json());

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.DATABASE_URL, {
      dbName: "dumpdynamix",
    });
    console.log("connected to mongoDB");
  } catch (err) {
    console.log(err.message);
  }
};
connectDB();
const calculateTKPHforTrip = async (vehicle_id,speed) => {
  console.log(vehicle_id);
  console.log("Inside calculateTKPHforTrip");

  const vehicleData = await VechicleSchmea.findOne({ vehicle_id: vehicle_id });
  if (!vehicleData) throw new Error("Vehicle data not found");
  //  const speed = vehicleData.avg_speed_per_shift;
  const payload = vehicleData.payload_in_tones;
  const maxPayload = vehicleData.maximum_payload;
  const grossWeight = vehicleData.gross_weight;

  const vehicleWeight = Math.round(Number(grossWeight) - Number(maxPayload), 2);
  const loadedTruckWeight = Math.round(vehicleWeight + Number(payload), 2);

  const frontAxleEmptyPercent = 45 / 100;
  const rearAxleEmptyPercent = 55 / 100;
  const frontAxleLoadedPercent = 35 / 100;
  const rearAxleLoadedPercent = 65 / 100;

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

  const frontTireLoadEmpty = frontAxleLoadEmpty / 2;
  const rearTireLoadEmpty = rearAxleLoadEmpty / 4;
  const frontTireLoadLoaded = frontAxleLoadLoaded / 2;
  const rearTireLoadLoaded = rearAxleLoadLoaded / 4;

  const meanFrontTireLoad = Math.round(
    (frontTireLoadEmpty + frontTireLoadLoaded) / 2,
    2
  );
  const meanRearTireLoad = Math.round(
    (rearTireLoadEmpty + rearTireLoadLoaded) / 2,
    2
  );

  // Use real-time speed instead of AWSS
  const dynamicSpeed = speed || 0; // Speed in km/h
  const frontTireTKPH = Math.round(meanFrontTireLoad * speed, 2);
  const rearTireTKPH = Math.round(meanRearTireLoad * speed, 2);

  return {
    frontTireTKPH,
    rearTireTKPH,
  };
};



app.post("/data", async (req, res) => {
  const { vehicle_id, data } = req.body;
   console.log(data.payload);
   
  if (!vehicle_id || !data) {
    return res.status(400).send("Invalid data");
  }

  try {
    const admin = await AdminSchmea.findOne({
      email: "nandhakrishnandev@gmail.com",
    });
    const truck = await VechicleSchmea.findOne({ vehicle_id: vehicle_id });

    if (!truck) {
      return res.status(404).send("Vehicle not found");
    }

    const operator = await OperatorSchmea.findOne({
      operator_id: truck.operator_id,
    });

    const trips =await TripSchmea.findOne({
      vehicle_id:vehicle_id,
      status: "started"
    })
  
    console.log("trips" , trips);
    

    // updating status new trip
   
    if( trips && data.payload>1){
        
      trips.status ="Loaded"
      trips.payload = data.payload
      await trips.save();
      console.log("--------------trip updated-----------");
      

    }
    else{
      const loadedtrucks = await TripSchmea.findOne({
        vehicle_id:vehicle_id,
        status: "Loaded"
      })
      if(loadedtrucks){
        loadedtrucks.payload = data.payload
        await loadedtrucks.save();
        console.log("--------------trip updated-----------");
      }
    }
    
    
  // ending the trip
    if(data.payload<=0.70){
      const trips =await TripSchmea.findOne({
        vehicle_id:vehicle_id,
          status: "Loaded"
      })

      if(trips){
        trips.status = "Completed" 
        trips.endTime = new Date().toISOString()
        const data = await calculateTKPHforTrip(vehicle_id , trips.speed )
        trips.frontTireTKPH = data.frontTireTKPH
        trips.rearTireTKPH = data.rearTireTKPH
        trips.endcordinates = {
          latitude:data.latitude,
          longitude:data.longitude
        }
        truck.current_speed = 0
        await truck.save();
        await trips.save();
      }
   console.log("Trip Closed");
     
    }

    
    truck.payload_in_tones = data.payload;
    truck.avg_speed_per_shift = data.awss;
    truck.status = data.speed > 0 ? "driving" : truck.status;
    truck.gps_coords.latitude = data.latitude;
    truck.gps_coords.longitude = data.longitude;

    const pressure = data.pressure;
    const tyreData = await TyreSchemea.find({ vehicle_id: vehicle_id });
       console.log(pressure);
      
       for (const tyre of tyreData) {
        const tyrePressureData = pressure[tyre.tyre_id];
        if (tyrePressureData) {
          console.log("TYRE PRESSURE CHANGED", tyrePressureData);
          const tyrePressure = tyrePressureData.pre;
          console.log(tyrePressure);
          const batteryPercentage = tyrePressureData.battery_percentage;
          // Skip processing if tyrePressure is 0
          if (tyrePressure === 0) {
            console.log(`Skipping notification for tyre ID ${tyre.tyre_id} as pressure is 0.`);
            continue;
          }
      
          if (tyrePressure >= 0 && batteryPercentage) {
            tyre.tyre_pressure = tyrePressure;
            tyre.battery_Percentage = tyrePressureData.battery_percentage;
            await tyre.save();
          } else {
            continue;
          }
      
          if (
            tyrePressure > tyre.standard_psi ||
            tyrePressure < (tyre.standard_psi / 100) * 75
          ) {
            let message;
            const recentNotification = await Notification.findOne({
              tyre_id: tyre.tyre_id,
            });
      
            if (recentNotification) {
              const currentTime = new Date();
              const notificationTime = new Date(recentNotification.createdAt);
              const difference = currentTime - notificationTime;
              // Skip if less than 10 minutes
              if (difference < 600000) {
                continue;
              }
            }
            
            if (tyrePressure > tyre.standard_psi) {
              message = `Tyre with ID ${tyre.tyre_id} pressure is high`;
            } else {
              message = `Tyre with ID ${tyre.tyre_id} pressure is low`;
            }
          //  Sending Notifications


            if (admin.token) {
              sendNotification(admin.token, "Tyre Pressure Alert", message);
            }
            if (operator?.token) {
             sendNotification(operator.token, "Tyre Pressure Alert", message);
            }
            //Save Notification to DB
            const newNotification = new Notification({
              notification_id: Math.random() * 12,
              notification_Type: "TPA",
              vehicle_id: vehicle_id,
              tyre_id: tyre.tyre_id,
              title: "Critical Tyre Pressure",
              body: message,
            });
            await newNotification.save();
          }
        }
      }

    await truck.save();
    res.status(200).send("Data received successfully");
  } catch (error) {
    console.error("Error handling /data route:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.use("/reports", require("./routes/ReportRoutes"));
app.use("/notification", require("./routes/Notificationroute"));
app.use("/trip",require("./routes/TripRoutes"))
app.use("/maintenance", require("./routes/MaintananceRoutes"));
app.use("/inspection", require("./routes/INspectionRoutes"));

app.use("/inventory", require("./routes/InventoryRoutes"));
app.post("/Sendnotification", async (req, res) => {
  const { title, body, vehicle_id } = req.body;
  const vehicle = await VechicleSchmea.findOne({ vehicle_id: vehicle_id });
  console.log(vehicle);
  if (!vehicle) {
    return res.send("Vehicle not found");
  }
  const operator_id = vehicle.operator_id;

  const operator = await OperatorSchmea.findOne({ operator_id: operator_id });
  console.log(operator);

  const token = operator.token;

  const message = {
    notification: {
      title,
      body,
    },
    token,
  };
  admin
    .messaging()
    .send(message)
    .then((response) => {
      console.log("Successfully sent message:", response);
      res.send("Successfully sent message");
    })
    .catch((error) => {
      console.log("Error sending message:", error);
      res.send("Error sending message");
    });
});
 
app.use("/tkph", require("./routes/TkphRotues"));
app.use("/expense", require("./routes/ExpenseRoutes"));
app.use("/inspection", require("./routes/INspectionRoutes"));
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/truck_Details", require("./routes/TruckRoutes"));
app.use("/api", require("./routes/userRoutes"));
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
