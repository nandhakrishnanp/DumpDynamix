import React, { useEffect, useState } from "react";
import CalenderComponent from "../Components/Calender";
import "react-calendar/dist/Calendar.css";
import axiosInstance from "../../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
const Maintance = () => {
  const [date, setDate] = React.useState(null);

  const [maintance, setMaintance] = React.useState(null);
  const [ongoing, setOngoing] = React.useState(null);
  const [member, setMember] = useState(null);
  const [current, setCurrent] = useState(null);

  const nav = useNavigate();

  const fetchMaintanancebyId = async () => {
    const response = await axiosInstance.get(
      `/maintenance/getMaintance/${date}`
    );
    const data = await response.data;
    setMember(null);

    console.log("data", data);
    if (data && data.length > 0) {
      setMaintance(data);
    } else {
      setMaintance(null);
    }
  };

  const fetchAllMainTenance = async () => {
    const response = await axiosInstance.get("/maintenance/getMaintance");
    const data = await response.data;
    console.log(data);
    setOngoing(data);
  };

  const fetchMaintananceTeam = async (id) => {
    const response = await axiosInstance.get(
      `/maintenance/getMaintanceteam/${id}`
    );
    const data = await response.data;
    console.log("datass" ,data);
    setMember(data);
    console.log("member", member);
    
  };

  useEffect(() => {
    if (date) {
      fetchMaintanancebyId();
    }
  }, [date]);

  useEffect(() => {
    if (current) {
      fetchMaintananceTeam(current.assignedTeam);
    }
  }, [current]);

  useEffect(() => {
    fetchAllMainTenance();
  }, []);
  return (
    <div className="  bg-gray-200 w-full">
      <div className=" flex items-center ">
        <h1 className=" px-5 py-4 font-bolf font-Inter text-2xl ">
          Maintanance Schedule
        </h1>
        <Link to="new">
          <p
            onClick={() => {}}
            className=" bg-primary h-fit px-2 py-1 rounded-md text-white font-Inter hover:scale-105  transition-all duration-100 cursor-pointer"
          >
            {" "}
            New Maintanance
          </p>
        </Link>
      </div>

      <div className=" flex  w-full">
        <div className="px-5">
          <CalenderComponent setDate={setDate} />
        </div>
        <div className=" w-full">
          <p className=" text-lg  font-Inter font-bold text-primary">
            Available Schedules
          </p>
          <div className=" flex gap-3">
            <div className=" flex    ">
              {maintance &&
                maintance.map((m) => (
                  <div
                    onClick={() => {
                      setCurrent(m);
                    }}
                    className=" my-1  cursor-pointer  h-fit  bg-white/90   rounded-md  px-4 py-1"
                  >
                    <p className=" font-Inter font-semibold  ">
                      Vehicle Id : {m.vehicle_id}
                    </p>
                    <p className=" font-Inter ">
                      Maintenance Type :{" "}
                      <span className=" text-primary">{m.maintenanceType}</span>
                    </p>

                    <div className=" flex  gap-5 font-Inter ">
                      <p>
                        {" "}
                        Team :{" "}
                        <span className=" text-primary">
                          {m.assignedTeam}
                        </span>{" "}
                      </p>
                      <p>
                        {" "}
                        Status :{" "}
                        <span className=" text-primary">{m.status}</span>{" "}
                      </p>
                    </div>
                  </div>
                ))}
              {!maintance && (
                <p className=" py-28 font-poppins ">No Schedules Available</p>
              )}
            </div>

            <div>
              {current && member && (
                <div className="bg-white p-2 rounded-md">
                  <h3 className="text-lg font-Inter text-primary">
                    Maintanance Crew
                  </h3>

                  <p>
                    Team Id :{" "}
                    <span className="font-Inter text-primary">
                      {member.team_id}
                    </span>
                  </p>
                  {member && member.members && member.members.length > 0 ? (
                    member.members.map((m, index) => (
                      <div
                        key={index}
                        className="bg-primary text-white font-Inter p-4 m-2 rounded-md"
                      >
                        <p> Name : {m.name}</p>
                        <p> Role : {m.role}</p>
                        <p> Contact : {m.contact}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">
                      No members found in the team.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className=" px-5 py-2">
        <p className=" text-lg  font-Inter font-bold text-primary">
          Ongoing Works
        </p>
        {ongoing &&
          ongoing.map((m) => (
            <div className=" my-2 cursor-pointer p-4  bg-white rounded-md  px-4 py-2">
              <p className=" font-Inter font-semibold  ">
                Vehicle Id : {m.vehicle_id}
              </p>
              <p className=" font-Inter ">
                Maintenance Type : {m.maintenanceType}
              </p>

              <div className=" flex  gap-5 font-Inter ">
                <p>
                  {" "}
                  Team : <span className=" text-primary">
                    {m.assignedTeam}
                  </span>{" "}
                </p>
                <p>
                  {" "}
                  Status : <span className=" text-primary">
                    {m.status}
                  </span>{" "}
                </p>
              </div>
            </div>
          ))}

        {!ongoing && <p className=" px-2 py-14">No Ongoing Works</p>}
      </div>

      <div></div>
    </div>
  );
};

export default Maintance;
