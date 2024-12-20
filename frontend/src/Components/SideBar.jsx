import React, { useEffect, useState } from "react";
import dash from "../assets/dash.svg";
import danger from "../assets/danger.svg";
import bottom from "../assets/bottom.svg";
import bell from "../assets/bell.svg";
import box from "../assets/box.svg";
import maps from "../assets/maps.svg";
import group from "../assets/group.svg";
import settings from "../assets/settings.svg";
import { Link, useNavigate } from "react-router-dom";
const SideBar = () => {

     
  
    const [admin, setAdmin] = useState("");

    
    const nav = useNavigate();

      const fetchAdmin =async()=>{
         const data = await localStorage.getItem('admin')
         setAdmin(JSON.parse(data))
        console.log(admin);
        
         
      }
   useEffect(()=>{
       
      fetchAdmin();

   },[])

  


  return (
    <div className=" w-[24%] min-h-screen overflow-y-hidden bg-white  flex-col  items-center ">
      <div className=" flex items-center p-3 ">
        <h1 className=" font-bold text-lg text-primary font-poppins">
          DumpDynamiX
        </h1>
      </div>
        
     <div>
          {
            admin ? <div >

              <div className=" flex gap-1 p-2">
              <img className=" w-11 h-11 object-contain " src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="" />
              
              <div>
              <p className="text-sm text-black font-bold font-Inter px-3">{admin.name}</p>
              <p className="text-sm text-primary font-Inter px-3">{admin.email}</p>
                
                <div
                
                onClick={()=>{
                  localStorage.removeItem('admin')
                  nav('/')
                  
                }}
                
                className=" bg-primary flex items-center cursor-pointer justify-center m-3 rounded-md">
                   <p className=" font-Inter p-1 text-white font-bold">LogOut</p>
                </div>
              </div>
              

              </div>
          
            </div> :null
          }    
     </div>

      <div>
        <div className=" flex flex-col   gap-3 mt-3  ">
          <Link to="/dashboard/home">
            <div className=" flex px-3 items-center cursor-pointer  hover:bg-gray-200 py-2 gap-2">
              <img className=" w-8" src={dash} alt="dash" />
              <p className=" font-poppins">Dashboard</p>
            </div>
          </Link>
          <Link to="/dashboard/notification">
            <div className=" flex px-3 items-center cursor-pointer hover:bg-gray-200 py-2  gap-2">
              <img className=" w-8" src={bell} alt="dash" />
              <p className=" font-poppins">Notifications</p>
            </div>
          </Link>
          <Link to="/dashboard/inventory">
            <div className=" flex px-3 items-center cursor-pointer hover:bg-gray-200 py-2  gap-2">
              <img className=" w-8" src={box} alt="dash" />
              <p className=" font-poppins">Inventory</p>
            </div>
          </Link>
          <Link to="/dashboard/maps">
            <div className=" flex px-3 items-center cursor-pointer hover:bg-gray-200 py-2  gap-2">
              <img className=" w-8" src={maps} alt="dash" />
              <p className=" font-poppins">Maps</p>
            </div>
          </Link>
          <Link to="/dashboard/maintance">
            <div className=" flex px-3 items-center cursor-pointer hover:bg-gray-200 py-2  gap-2">
              <img className=" w-8" src={group} alt="dash" />
              <p className=" font-poppins">Maintanance</p>
            </div>
          </Link>

          <Link to="/dashboard/analytics">
            <div className=" flex px-3 items-center cursor-pointer hover:bg-gray-200 py-2  gap-2">
              <img className=" w-8" src={bottom} alt="dash" />
              <p className=" font-poppins">Analytics</p>
            </div>
          </Link>

          {/* <Link to="/dashboard/settings">
            <div className=" flex px-3 items-center cursor-pointer hover:bg-gray-200 py-2  gap-2">
              <img className=" w-8" src={settings} alt="dash" />
              <p className=" font-poppins">Settings</p>
            </div>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
