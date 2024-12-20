import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axiosConfig";
import { toast } from "react-toastify";
import CircularGauge from "../Components/PSI";
import { format } from "date-fns";
import TkphChart from "../Components/tkphHistoryCharts";

const TruckDetails = () => {
  const vehicle_id = useParams().id;
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
  const fetchTruckDetails = async () => {
    const res = await axiosInstance.get(`/truck_Details/${vehicle_id}`);
    const data = await res.data;
    setTruckDetails(data);
    console.log(data);
  };

  const FetchTkphData = async () => {
    const response = await axiosInstance.get(`/tkph/${vehicle_id}`);
    const res = await response.data;
    console.log(res);
    setTkphData(res.tkphData);
  };

  const downloadPDF = async () => {
    try {
      const response = await axiosInstance.post(
        "/reports/generate",
        { vehicle_id: vehicle_id },
        { responseType: "blob" }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `Report${vehicle_id}${format(new Date(), "dd-MM-yy hh-mm-ss")}.pdf`
      );
      document.body.appendChild(link);

      link.click();

      // Clean up
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the file", error);
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

  const fetchPressureData = async () => {
    try {
      const res = await axiosInstance.get(`/truck_Details/tyre/${vehicle_id}`);
      const data = await res.data;
      setCurrentTyre(data[0]);
      setPressureData(data);

      console.log(data);
    } catch (error) {
      toast.error("Error fetching pressure data");
    }
  };

  const fetchTkphHistory = async () => {
    try {
      const response = await axiosInstance.get(`/tkph/history/${vehicle_id}`);
      const res = await response.data;
      console.log(res);
      setTkphHistory(res.history.history);
      console.log(res.history.history);
    } catch (error) {
      console.log(error);

      toast.error("error fetching history");
    }
  };

  useEffect(() => {
    if (pressureData) {
      pressureData.map((item) => {
        if (item.tyre_position == "FL") {
          setFL(item.tyre_pressure);
        }
        if (item.tyre_position == "FR") {
          setFR(item.tyre_pressure);
        }
        if (item.tyre_position == "RL1") {
          setRL1(item.tyre_pressure);
        }
        if (item.tyre_position == "RL2") {
          setRL2(item.tyre_pressure);
        }
        if (item.tyre_position == "RR1") {
          setRR1(item.tyre_pressure);
        }
        if (item.tyre_position === "RR2") {
          setRR2(item.tyre_pressure);
        }
      });
    }
  }, [pressureData]);
  useEffect(() => {
    console.log(vehicle_id);
    fetchTruckDetails();
    fetchPressureData();
    FetchTkphData();
    fetchTkphHistory();
  }, []);
  return (
    <div className=" w-full h-screen  overflow-y-scroll bg-gray-200/90 bg-g">
      <div>
        <p
          onClick={() => {
            downloadPDF();
          }}
          className="bg-primary cursor-pointer hover:bg-primary/90 w-fit font-semibold font-Inter p-2 m-2 rounded-lg text-white"
        >
          Download Report
        </p>
      </div>

      {truckDetails ? (
        <div className="flex">
          <div className="bg-white rounded-md m-3 flex-1">
            <p className="text-xl p-2 text-primary font-poppins font-semibold  m-5">
              Truck Details
            </p>

            <div className=" flex">
              <img
                src="https://s7d2.scene7.com/is/image/Caterpillar/CM20220311-66255-4bf73?$cc-s$"
                alt=""
              />
              <div>
                <p className="text-lg font-Inter   m-5">
                  Truck ID : {truckDetails.truckData.vehicle_id}
                </p>
                <p className="text-lg font-Inter   m-5">
                  Truck Make: {truckDetails.truckData.truck_make}
                </p>

                <p className="text-lg font-Inter   m-5">
                  Truck Model : {truckDetails.truckData.model}
                </p>
                <p className="text-lg font-Inter   m-5">
                  Payload Capacity : {truckDetails.truckData.maximum_payload}{" "}
                  Tonnes
                </p>
              </div>
            </div>
          </div>
          <div className=" w-[25%]  bg-white rounded-md m-3">
            <p className="text-xl p-2 text-primary font-poppins font-semibold  m-5">
              Operator
            </p>
            <div className="p-3 px-8 flex flex-col items-center justify-center  gap-1">
              <img
                className=" w-[120px]"
                src="https://cdn-icons-png.flaticon.com/512/7915/7915522.png"
                alt=""
              />

              <p className=" font-Inter ">{truckDetails.opearordata.name}</p>
              <p className="  font-Inter ">
                {truckDetails.opearordata.email}
              </p>
              <p className=" font-Inter ">
                {truckDetails.opearordata.phone_number}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p
          className="
        text-3xl text-primary font-poppins font-bold  m-5
        "
        >
          Loading...
        </p>
      )}

      {pressureData ? (
        <div className="bg-white m-3 rounded-md">
          <p className="text-xl p-2 text-primary font-poppins font-semibold  m-5">
            Pressure Analysis
          </p>

          <div className=" flex">
            <div>
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
            </div>

            <div>
              <div className=" flex gap-6">
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

              <div className=" flex">
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
                    <p className=" font-Inter font-semibold text-lg">
                      {" "}
                      Tyre Thread Depth - {currentTyre.tyre_tread_depth} MM
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

                    <div className=" flex gap-3">
                      <div className=" flex my-3 rounded-lg  gap-2 items-center justify-center  bg-primary p-2  cursor-pointer ">
                        <img
                          className=" w-[12px]"
                          src="https://www.pngkey.com/png/full/234-2341633_30-pm-3592-twitter-5-30-2017-rupee.png"
                          alt=""
                        />
                        <p className=" text-lg  text-white font-Inter ">
                          Cost Analysis
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p
          className="
        text-3xl text-primary font-poppins font-bold  m-5
        "
        >
          Loading...
        </p>
      )}

      <div className=" bg-white rounded-md m-3">
        <p className="text-xl p-2 text-primary font-poppins font-semibold  m-5">
          TKPH Analysis
        </p>
        {tkphData ? (
          <div>
            <div className=" p-4  flex flex-col  items-center justify-center  ">
              <div className=" flex gap-4">
                <div className=" w-[200px]  h-[200px] border-4 border-primary flex items-center justify-center  rounded-full ">
                  <div className=" flex flex-col items-center justify-center">
                    <p className=" text-3xl font-Inter font-bold">
                      {tkphData.frontTireTKPH}
                    </p>
                    <p className=" text-xl font-Inter text-primary font-bold">
                      Front Tyres
                    </p>
                  </div>
                </div>

                <div className=" w-[200px]    h-[200px] border-4 border-primary flex items-center justify-center  rounded-full ">
                  <div className=" flex flex-col items-center justify-center">
                    <p className=" text-3xl font-Inter font-bold">
                      {tkphData.rearTireTKPH}
                    </p>
                    <p className=" text-xl font-Inter text-primary font-bold">
                      Rear Tyres
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <p className=" font-Inter text-xl px-3 py-4">
                  Average Speed Per Work Shift : {tkphData.awss} Km/h
                </p>
              </div>

              <div className=" flex   gap-1">
                <div className=" flex flex-col items-center rounded-lg bg-primary p-2 justify-center">
                  <p className=" font-Inter text-2xl font-bold text-white px-3">
                    {tkphData.meanFrontTireLoad} Tons
                  </p>
                  <p className=" font-Inter text-xl text-white  px-3 ">
                    Mean Front Tyre Load
                  </p>
                </div>
                <div className=" flex flex-col items-center rounded-lg bg-primary p-2 justify-center">
                  <p className=" font-Inter text-2xl font-bold text-white px-3">
                    {tkphData.meanRearTireLoad} Tons
                  </p>
                  <p className=" font-Inter text-xl text-white  px-3 ">
                    Mean Rear Tyre Load
                  </p>
                </div>
              </div>
                
                <TkphChart  data={tkphHistory} />
            </div>
          </div>
        ) : (
          <p
            className="
            text-3xl text-primary font-poppins font-bold  m-5
            "
          >
            Loading...
          </p>
        )}
      </div>
    </div>
  );
};

export default TruckDetails;
