import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axiosInstance from "../../axiosConfig";
import L from "leaflet";
import { toast } from "react-toastify";

const Maps = () => {
  const [currentTrip, setCurrentTrip] = useState(null);
  const [speed, setSpeed] = useState(null); // Speed in km/h
  const [distance, setDistance] = useState(null); // Distance in km
  const [button, setButton] = useState("Start Trip");
  const [position, setPosition] = useState({
    latitude: 18.4901,
    longitude: 74.0255,
    vehicle_id: "VH002",
  });

  const [running, setRunning] = useState(false);
  const [locked, setLocked] = useState(false);
const [tripSimulated, setTripSimulated] = useState(false);

  const latestTrip = async () => {
    try {
      const res = await axiosInstance.get("/trip/latesttrip/VH002");
      const data = await res.data;
      
      if (!data) {
        console.log("No Data Found");
      } else {
        console.log("data", data);
        setCurrentTrip(data);
        if (data.status === "Loaded" && data.payload < 2.51) {
          setButton("Loading Payload.");
        } else if (data.status === "Loaded" && data.payload > 2.5) {
          setButton("Moving");

          if (!running) {
            console.log("Running");
           setRunning(true);
            simulateMovement(data.distance);
            toast.success("Trip Started .....");
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const customIcon = L.icon({
    iconUrl:
      "https://cdn.pixabay.com/photo/2021/07/22/22/13/truck-6486106_1280.png", // Replace with your image path
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });

  const addTrip = async () => {
    const res = await axiosInstance.post("/trip/newtrip", {
      vehicle_id: "VH002",
      data: {
        latitude: position.latitude,
        longitude: position.longitude,
        speed: speed,
        distance: distance,
      },
    });
    const data = res.data;
  };

  // Helper function to calculate new position based on distance and bearing
  const calculateNewPosition = (lat, lon, distance, bearing) => {
    const R = 6371; // Earth's radius in kilometers
    const d = distance / R; // Convert distance to radians
    const bearingRad = (bearing * Math.PI) / 180; // Convert bearing to radians

    const lat1 = (lat * Math.PI) / 180;
    const lon1 = (lon * Math.PI) / 180;

    const lat2 = Math.asin(
      Math.sin(lat1) * Math.cos(d) +
        Math.cos(lat1) * Math.sin(d) * Math.cos(bearingRad)
    );

    const lon2 =
      lon1 +
      Math.atan2(
        Math.sin(bearingRad) * Math.sin(d) * Math.cos(lat1),
        Math.cos(d) - Math.sin(lat1) * Math.sin(lat2)
      );

    return {
      latitude: (lat2 * 180) / Math.PI,
      longitude: (lon2 * 180) / Math.PI,
    };
  };

  const calsimulation = async () => {
    simulateMovement(parseFloat(5));
  }

  // Function to simulate movement
  const simulateMovement = (distance) => {
    console.log("Distance", distance);
    console.log("Simulating");
    const speedPerSecond = speed / 3600; // Speed in km/s
    const intervalDistance = speedPerSecond * 1; // Distance covered in 1 second
    const bearing = 90; // Example: Move eastwards

    let remainingDistance = distance;

    const intervalId = setInterval(() => {
      if (remainingDistance <= 0) {
        clearInterval(intervalId);
        setButton("Trip Completed");
        return;
      }

      setPosition((prevPosition) => {
        const newPosition = calculateNewPosition(
          prevPosition.latitude,
          prevPosition.longitude,
          intervalDistance,
          bearing
        );

        remainingDistance -= intervalDistance;

        return newPosition;
      });
    }, 300); // Update position every second
  };

  // Handle trip start
  const handleTrip = async () => {
    if (speed && distance) {
      addTrip();
      simulateMovement(parseFloat(distance));
    } else {
      toast.error("Please Enter The Speed and Distance");
    }
  };

  useEffect(() => {
    // Uncomment if needed to fetch latest trip
    // latestTrip();

    // setInterval(() => {
    //   latestTrip();
    // }, 2500);
  }, []);


  return (
    <div className="h-screen overflow-y-hidden">
      <div className="flex flex-col items-center justify-center shadow-xl bg-white right-6 p-10 bottom-10 z-50 w-[300px] h-[300px] absolute">
        <p className="text-2xl text-center text-primary font-poppins font-bold">
          Trip Simulation
        </p>

        <div className="py-4 flex flex-col gap-2">
          <div className="flex gap-1">
            <input
              value={speed}
              onChange={(e) => setSpeed(e.target.value)}
              type="text"
              className="active:border-primary font-poppins border-[2px] py-1 px-2 rounded-md"
              placeholder="Enter The Speed"
            />
            <p className="text-primary">Km/hr</p>
          </div>

          <div className="flex gap-1">
            <input
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              type="text"
              className="active:border-primary font-Inter border-[2px] py-1 px-2 rounded-md"
              placeholder="Enter The Distance"
            />
            <p className="text-primary">Km</p>
          </div>
        </div>

        <button
          onClick={()=>{
            handleTrip();
          }}
          className="bg-primary font-poppins font-bold px-3 py-2 rounded-md text-cyan-50"
        >
          {button}
        </button>
      </div>
      <MapContainer
        style={{ height: "100vh", width: "80vw", zIndex: 0 }}
        center={[position.latitude, position.longitude]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {position && (
          <Marker
            icon={customIcon}
            position={[position.latitude, position.longitude]}
          >
            <Popup>
              <div>
                <p className="font-Inter font-bold">
                  Vehicle ID: {position.vehicle_id}
                </p>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default Maps;
