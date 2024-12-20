import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosConfig';
import { toast } from 'react-toastify';
import CircularGauge from '../Components/PSI';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [tyreData, setTyreData] = useState(null);

  const fetchNotifications = async () => {
    try {
      const response = await axiosInstance.get('/notification/');
      console.log(response.data);
      setNotifications(response.data);
    } catch (error) {
      console.log(error);
    }
  };


  const fetchTyreData = async (tyre_id)=>{
    try{
      const response = await axiosInstance.get(`/truck_Details/tyre/id/${tyre_id}`);
      console.log(response.data);
      setTyreData(response.data);
    }catch(error){
      console.log(error);
      toast.error('Error fetching tyre data');
    }
  }

  useEffect(() => {
    fetchNotifications();
  }, []);

  const openModal = (notification) => {
    setSelectedNotification(notification);
  };

  const closeModal = () => {
    setSelectedNotification(null);
    setTyreData(null);
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

  return (
    <div className="min-h-screen bg-gray-200 w-full p-4 ">
      <h1 className="text-2xl text-primary font-poppins mb-4">Notifications</h1>

      {notifications.length === 0 ? (
        <p className="text-xl text-primary font-poppins">No Notifications</p>
      ) : (
        <ul className="">
          {notifications.map((notification) => (
            <li
              key={notification._id}
              className="bg-white p-4  rounded shadow my-3 cursor-pointer hover:bg-gray-100"
              onClick={() => {openModal(notification)
                fetchTyreData(notification.tyre_id)
              }}
            >
              <h2 className="text-lg font-Inter font-bold">{notification.title}</h2>
              <p className="text-gray-600 font-Inter">{notification.body}</p>
            </li>
          ))}
        </ul>
      )}

      {selectedNotification && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded shadow flex "
            onClick={(e) => e.stopPropagation()} 
          > 


          <div>
          <h2 className="text-xl font-bold mb-4">
              {selectedNotification.title}
            </h2>
            <p className=' font-Inter text-black '>
              <strong>Body:</strong> {selectedNotification.body}
            </p>
            <p className=' font-Inter text-black '>
              <strong>Vehicle ID:</strong> {selectedNotification.vehicle_id}
            </p>
            <p className=' font-Inter text-black '>
              <strong>Tyre ID:</strong> {selectedNotification.tyre_id}
            </p>
           
          </div>
            <div className=' flex flex-col items-center justify-center'>
                 <img className=' w-[350px]' src="https://wallpapers.com/images/high/truck-tire-png-wax-32xxtka03k6cgzjo.png" alt="" />
                 {
                  tyreData&&(
                    <div>
                        <p className=' font-Inter text-primary font-bold'> {tyreData.tyre_make} {tyreData.tyre_model}</p>
                        <p className=' font-Inter text-black font-bold'> Position - {GetPositionName(tyreData.tyre_position)}</p>
                    </div>
                  )
                 }
            </div>
            <div>
                 {
                    tyreData && (
                      <>
                      <h2 className="text-xl font-Inter font-bold mb-4">
                        Tyre Details
                      </h2>
                      <CircularGauge psi={tyreData.tyre_pressure} />
                      <p className=' font-Inter'>
                        <strong>KM Driven : </strong> {tyreData.km_drived} KM
                      </p>
                      <p className=' font-Inter'>
                        <strong>Total Operating Hours :</strong> {tyreData.operating_hours} Hrs
                      </p>
   <p className=' font-Inter'>
                        <strong> 
                        Miscellaneous Cost
                           :</strong> {tyreData.Miscellaneous_cost} Rs
   </p>

                    </>
                    )
                 }
            </div>
            <div>
            <button
              className="mt-4 px-4 py-2 bg-primary text-white rounded"
              onClick={closeModal}
            >
              Close
            </button>
            </div>
          
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
