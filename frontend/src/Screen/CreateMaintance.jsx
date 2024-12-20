import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateMaintance = () => {
  //options
  // "Routine Inspection",
  // "Tread Depth Check",
  // "Alignment/Rotation",
  // "Puncture Repair",
  // "Valve Replacement",
  // "Sidewall Repair",
  // "Retreading",

  const nav = useNavigate();

  const [type, setType] = useState("Routine Inspection");

  const [team, setTeam] = useState(null);
  const [currentTeam , setCurrentTeam] = useState(null);
  const [vehicle_id , setVehicle_id] = useState(null);
  const [schduledDate , setSchduledDate] = useState(null);

  const fetchMaintanance = async () => {
    const respose = await axiosInstance.get("/maintenance/getMaintanceteam");
    const data = await respose.data;
    setTeam(data);
  };


   const addMaintanance = async () => {
  
    const respose = await axiosInstance.post("/maintenance/addMaintanance",{

      vehicle_id:vehicle_id,
      maintenanceType:type,
      scheduledDate:schduledDate,
      assignedTeam:currentTeam,
    });
    const res= await respose.data;
    console.log(res);
    if(res.status === "success"){
      toast.success("Maintanance Created Successfully");
      nav("/dashboard/maintance/");
    }
    else{
      console.log(res , "error");
      toast.error("Error in Creating Maintanance");
    }

   }

   // format in yyyy-mm-dd

const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    setSchduledDate(`${year}-${month}-${day}`);
   }

   
  useEffect(() => {
    fetchMaintanance();
  }, []);

  return (
    <div className="bg-gray-200 w-full">
      <p className=" px-3 font-Inter  text-xl py-2">Create New Maintanance</p>

      <div className="bg-white mx-5 w-full p-5 rounded-lg shadow-md">
        <p className=" font-Inter font-semibold text-lg">Vehicle ID</p>
        <input
          value={vehicle_id}
          onChange={(e) => {
            setVehicle_id(e.target.value);
          }}
          type="text"
          placeholder="Vehicle ID"
          className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <p className=" font-Inter font-semibold text-lg mt-3">Assigned Team</p>

        {team ? (
          <select
            value={currentTeam}
            onChange={(e) => {
              setCurrentTeam(e.target.value);
              console.log(team);
            }}
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {team && team.map((team) => (
              <option className=" text-black" value={team.team_id}>{team.team_id}</option>
            ))}
          </select>
        ) : (
          <p>Loading...</p>
        )}

        <p className=" font-Inter font-semibold my-2 text-lg">
          Maintanance Type
        </p>

        <select
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            console.log(type);
          }}
          className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="Routine Inspection">Routine Inspection</option>
          <option value="Tread Depth Check">Tread Depth Check</option>
          <option value="Alignment/Rotation">Alignment/Rotation</option>
          <option value="Puncture Repair">Puncture Repair</option>
          <option value="Valve Replacement">Valve Replacement</option>
          <option value="Sidewall Repair">Sidewall Repair</option>
          <option value="Retreading">Retreading</option>
        </select>


        <p className=" font-Inter font-semibold text-lg mt-3">Scheduled Date</p>
        <input
          value={schduledDate}
          onChange={(e) => {
            formatDate(e.target.value);
          }}
          type="date"
          placeholder="Scheduled Date"
          className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button onClick={()=>{
          addMaintanance();
        }} className="bg-primary text-white p-2 rounded-md mt-3 w-full">
          Create Maintanance
        </button>
      </div>
    </div>
  );
};

export default CreateMaintance;
