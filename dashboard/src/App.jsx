import React, { useEffect, useState } from "react";
import CircularGauge from "../../frontend/src/Components/PSI";
import { format, set } from "date-fns";
import PayloadChart from "../Components/Payload";
import SpeedChart from "../Components/SpeedChart";
import axiosInstance from "./axiosconfig";
const App = () => {
  const [truckDetails, setTruckDetails] = useState(null);
  const [pressureData, setPressureData] = useState(null);
  const [currentTyre, setCurrentTyre] = useState(null);
  const [tkphData, setTkphData] = useState(null);
  const [tkphHistory, setTkphHistory] = useState(null);
  const [FL, setFL] = useState(0);
  const [FR, setFR] = useState(0);
  const [RL1, setRL1] = useState(0);
  const [RL2, setRL2] = useState(0);
  const [RR1, setRR1] = useState(0);
  const [RR2, setRR2] = useState(0);
  const [status, setStatus] = useState("Live");
  const [currenttime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );
  const fetchTruckDetails = async () => {
    const res = await axiosInstance.get(`/truck_Details/VH002`);
    const data = await res.data;
    setTruckDetails(data.truckData);

    console.log(data);
  };

  const fetchPressureData = async () => {
    try {
      const res = await axiosInstance.get(`/truck_Details/tyre/VH002`);
      const data = await res.data;

      setCurrentTyre(data[0]);
      setPressureData(data);

      console.log("pressure", data);
    } catch (error) {
      toast.error("Error fetching pressure data");
    }
  };

  const GetPositionName = (position) => {
    if (position === "FL") {
      return "Front Left";
    }
    if (position === "FR") {
      return "Front Right";
    }
    if (position === "RL1") {
      return "Rear Left 1";
    }
    if (position === "RL2") {
      return "Rear Left 2";
    }
    if (position === "RR1") {
      return "Rear Right 1";
    }
    if (position === "RR2") {
      return "Rear Right 2";
    }
  };
const fethdata = async () => {
 
fetchPressureData()
fetchTruckDetails()

}
useEffect(() => {
  const enterFullscreen = () => {
    const element = document.documentElement; // Get the root element
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) { // Safari
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { // IE/Edge
      element.msRequestFullscreen();
    }
  };

  // Automatically enter fullscreen on load
  enterFullscreen();

  // Exit fullscreen when the component unmounts (optional)
  return () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };
}, []);


  useEffect(() => {


   setInterval(() => {
   
    fethdata()
    
    }, 3000);

   
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
  }, []);
  return (
    <div className="  w-full h-screen  flex flex-col items-center justify-center overflow-y-scroll bg-gray-200/90 bg-g">
      {truckDetails ? (
        <div className=" flex gap-4 font-bold font-Inter  items-center  mx-10 mt-2">
            <p className="   font-poppins text-bold text-primary text-xl">DumpDynamix</p>     

          <p> {currenttime}</p>
          <p> Vehicle Id : {truckDetails.vehicle_id}</p>
          <p>
            Model : {truckDetails.truck_make} {truckDetails.model}
          </p>
          <p>
 {status ? <p className="bg-red-500 text-white px-2 py-1 rounded-md">RealTime</p> : <p className="bg-red-500 text-white px-2 py-1 rounded-md">Stopped</p>}
          </p>

    
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {pressureData ? (
        <div className="bg-white mx-3 m-3 rounded-md">
          <p className="text-xl p-2 text-primary font-poppins font-semibold  m-5">
            DashBoard
          </p>

          
            {/* <div>
              <div className=" relative  mx-16">
                <p className=" top-28 absolute bg-primary rounded-lg text-white px-3 py-1">
                  {FL}
                </p>

                <p className=" top-28 left-[247px] absolute bg-primary rounded-lg text-white px-3 py-1">
                  {FR}
                </p>
                <p className=" top-[412px] -left-8   absolute bg-primary rounded-lg mx-3 text-white px-3 py-1">
                  {RL1}
                </p>

                <p className=" top-[482px] left-10   absolute bg-primary rounded-lg mx-3 text-white px-3 py-1">
                  {RL2}
                </p>

                <p className=" top-[482px] left-[179px]   absolute bg-primary rounded-lg mx-3 text-white px-3 py-1">
                  {RR2}
                </p>

                <p className=" top-[412px] left-[253px]   absolute bg-primary rounded-lg mx-3 text-white px-3 py-1">
                  {RR1}
                </p>

                <img
                  src="https://i.postimg.cc/nrZPz9r3/Chassis-removebg-preview.png"
                  alt=""
                />
              </div>
            </div> */}

            <div>
              <div className=" flex gap-6 mx-3 my-3">
                {pressureData.map((item) => (
                  <div
                    onClick={() => {
                      setCurrentTyre(item);
                    }}
                    className={` ${
                      item == currentTyre
                        ? `bg-primary text-white`
                        : `bg-violet-500 text-white`
                    }
                px-2 py-1 rounded-md cursor-pointer font-sans  flex flex-col items-center`}
                  >
                    <p className=" font-poppins font-semibold">
                      {GetPositionName(item.tyre_position)}
                    </p>
                  </div>
                ))}
              </div>

              <div className=" flex my-3">
                <div>
                  <div className=" flex flex-col items-center">
                    <img
                      className="w-[300px] h-[300px] "
                      src="https://s.alicdn.com/@sc04/kf/H585a8753e85c4f3a913919082bf187edj.png_720x720q50.png"
                      alt=""
                    />
                    <p className=" font-bold font-Inter">
                      {currentTyre.tyre_make} - {currentTyre.tyre_model}
                    </p>
                  </div>
                  <div className=" mt-3 pl-12 flex flex-col gap-1 items-start justify-center ">
                    <p className=" font-Inter font-semibold text-lg">
                      {" "}
                      Tyre Id - {currentTyre.tyre_id}
                    </p>

                    <p className=" font-Inter font-semibold text-lg">
                      {" "}
                      Tyre Size - {currentTyre.tyre_size}
                    </p>
                    <p className=" font-Inter font-semibold text-lg">
                      {" "}
                      KM Driven - {currentTyre.km_drived}
                    </p>

                  </div>
                </div>

                <div className=" bg-violet-100 mt-5 mx-4 rounded-md  flex flex-col items-center justify-center flex-1">
                  <CircularGauge psi={currentTyre.tyre_pressure} />
                  <div className=" flex flex-col items-center justify-center">
                    <p className=" font-Inter font-semibold text-lg">
                      {" "}
                      FIxed On - {format(currentTyre.fixed_date, "dd-MM-yyyy")}
                    </p>
                    <p className=" font-Inter font-semibold text-lg">
                      {" "}
                      Last Inspection On -{" "}
                      {format(currentTyre.last_inspection_date, "dd-MM-yyyy")}
                    </p>
                  </div>
                </div>


                <div>
                   { truckDetails ? <PayloadChart psi={truckDetails.payload_in_tones} /> : null}

             
                    {
                      truckDetails ? <SpeedChart psi={truckDetails.current_speed}/> :null
                    }

                </div>

              
              </div>
           
          </div>
        </div>
      ) : (
        <p
          className="
        text-3xl text-primary font-poppins font-bold  mx-5
        "
        >
          Loading...
        </p>
      )}
    </div>
  );
};

export default App;
