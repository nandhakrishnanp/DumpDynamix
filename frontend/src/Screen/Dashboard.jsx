import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";
import { useNavigate } from "react-router-dom";
import TruckPieChart from "../Components/TruckChart";

const Dashboard = () => {
  const [truckData, setTruckData] = useState([]);


  const [noOftruck, setNoOftruck] = useState(0);
  const [noOftruckActive, setNoOftruckActive] = useState(0);
  const [noOftruckInactive, setNoOftruckInactive] = useState(0);

 
  const fetchTruckData = async () => {
    const res = await axiosInstance.get("/truck_Details");
    const data = await res.data;
    setTruckData(data);
    setNoOftruck(data.length);
    let active = 0;
    let inactive = 0;
    data.map((truck) => {
      if (truck.status === "driving") {
        active += 1;
      } else {
        inactive += 1;
      }
    });
    setNoOftruckActive(active);
    setNoOftruckInactive(inactive);
    console.log(data);
  };


  const nav = useNavigate();
  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("admin"));
    console.log(admin);

    fetchTruckData();
  }, []);
  return (
    <div className=" bg-gray-200/90 w-full h-screen  overflow-y-scroll">
      <div>
        <p className="text-2xl text-primary font-poppins font-bold  m-5">
          Dashboard
        </p>
      </div>

      {/* <div className=" flex items-center justify-start ms-4 gap-7">
        <div className=" flex flex-col items-center justify-center bg-white rounded-md  shadow-lg    p-4">
          <p className=" capitalize font-poppins">Trucks Available</p>
          <p className="text-3xl font-bold text-primary">{noOftruck}</p>
        </div>

        <div className=" flex flex-col items-center justify-center bg-white rounded-md shadow-lg p-4">
          <p className=" capitalize font-poppins">Trucks Active</p>
          <p className="text-3xl font-bold text-primary">{noOftruckActive}</p>
        </div>

        <div className=" flex flex-col items-center justify-center bg-white rounded-md shadow-lg  p-4">
          <p className=" capitalize font-poppins">Trucks Inactive</p>
          <p className="text-3xl font-bold font-poppins text-primary">{noOftruckInactive}</p>
        </div>
      </div> */}
      <div className=" flex  gap-2">
        <div className=" p-5 mx-5 bg-white flex flex-col rounded-lg  justify-center ">
          <h2 className="text-xl font-poppins ">
            {" "}
            Wellcome{" "}
            <span className=" text-primary font-bold">
              {JSON.parse(localStorage.getItem("admin"))?.name ||
                "No Admin Name"}
            </span>
          </h2>
          <p className="text-lg font-poppins ">Have A nice Day</p>
        </div>

        <div className=" bg-white flex-1 flex  items-center justify-center py-2 rounded-lg mr-3  ">
          <div className=" w-[50%]">
            <TruckPieChart
              numOfActiveTrucks={noOftruckActive}
              numOfRestTrucks={noOftruckInactive}
            />
          </div>

          <div className=" flex flex-col gap-2">
             
            <div className=" flex flex-col gap-2 items-center justify-center bg-primary rounded-md  shadow-lg p-2">
              <p className=" capitalize font-poppins text-pale">Trucks Available</p>
              <p className="text-xl font-bold text-pale">{noOftruck}</p>

              </div>
              <div className=" flex flex-col items-center justify-center bg-primary rounded-md  shadow-lg p-2">
              <p className=" capitalize font-poppins text-pale">Trucks Active</p>
              <p className="text-xl font-bold text-pale">{noOftruckActive}</p>

              </div>
              <div className=" flex flex-col items-center justify-center bg-primary rounded-md  shadow-lg p-2">
              <p className=" capitalize font-poppins text-pale">Trucks Inactive</p>
              <p className="text-xl font-bold font-poppins text-pale">{noOftruckInactive}</p>
              </div>
          </div>
        </div>
      </div>

      <div>
        <p className="text-xl text-primary font-poppins font-bold  m-5">
          Available Trucks
        </p>
      </div>

      <div className=" flex flex-wrap justify-around items-center ">
        {truckData.map((truck) => (
          <div
            onClick={() => {
              nav(`${truck.vehicle_id}`);
            }}
            className=" hover:scale-105 hover:bg-slate-50  w-[280px] transition-all duration-100 flex flex-col cursor-pointer items-center justify-between bg-white my-3 p-5 rounded-md "
          >
            <img
              className=" w-[250px]"
              src="https://www.tatahitachi.co.in/wp-content/uploads/2018/07/thumbnail-zx-20u-5a-3.png"
              alt=""
            />
            <p className="text-md  font-poppins">
              Truck Id : {truck.vehicle_id}
            </p>
            <p className="text-sm py-1  font-poppins capitalize">
              {" "}
              Status :{" "}
              <span
                className={
                  truck.status == "driving" ? "text-green-500" : "text-red-400"
                }
              >
                {truck.status}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
