import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";
import { format} from "date-fns"

const Inventory = () => {
  const [tyres, setTyres] = useState(null);
  const [current, setCurrent] = useState(null);
  const [Search, setSearch] = useState("");
  const [filteredTyres, setFilteredTyres] = useState(null);
  const fetchInventory = async () => {
    const response = await axiosInstance.get("/inventory");
    const data = await response.data;
    console.log(data);
    setTyres(data);
    setFilteredTyres(data);
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  useEffect(() => {
    console.log(Search);
    if (Search) {
      const filtered = tyres.filter((tyre) => {
        return (
          tyre.model.toLowerCase().includes(Search.toLowerCase()) ||
          tyre.brand.toLowerCase().includes(Search.toLowerCase())
        );
      });
      setFilteredTyres(filtered);
    } else {
      setFilteredTyres(tyres);
    }
  }, [Search]);

  return (
    <div className=" bg-gray-200/90  h-screen overflow-y-scroll  w-full  ">
      <div className=" px-12 py-3 flex gap-4 justify-between  ">
        <p className=" text-xl  font-bold font-Inter ">Inventory</p>

        <div>
          <input
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            value={Search}
            type="text"
            className=" h-8 py-1 px-2  border-2 hover:border-primary rounded-md "
            placeholder="Search By Tyre Model"
          />
        </div>
      </div>

      <div className=" flex  flex-wrap items-center justify-center ">
        {filteredTyres &&
          filteredTyres.map((tyre) => {
            return (
              <div
                onClick={() => {
                  setCurrent(tyre);
                }}
                className=" cursor-pointer  flex flex-col items-center justify-center  w-[30%] bg-white p-4 m-2 rounded-lg shadow-md"
              >
                <img
                  className=" w-32"
                  src="https://content.jdmagicbox.com/rep/b2b/nylon-truck-tyre/nylon-truck-tyre-1.png?impolicy=queryparam&im=Resize=(360,360),aspect=fit"
                  alt=""
                />

                <div className=" flex flex-col py-2 items-center justify-center">
                  <p className="text-lg  font-Inter">
                    {tyre.brand} {tyre.model}
                  </p>

                  <p className="text-lg  font-Inter  text-primary">
                    In Stock : {tyre.quantityInStock}{" "}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
      {/* application
: 
"Construction"
brand
: 
"Goodyear"
compatibility
: 
{truckModels: Array(2)}
createdAt
: 
"2024-12-09T06:55:42.393Z"
expiryDate
: 
"2029-08-01T00:00:00.000Z"
loadCapacity
: 
15000
manufactureDate
: 
"2023-08-01T00:00:00.000Z"
model
: 
"RT-3B"
notes
: 
"Ideal for high-load, high-impact applications."
plyRating
: 
34
price
: 
4100
quantityInStock
: 
16
size
: 
"35/65R33"
supplier
: 
{name: 'Goodyear Direct', contact: '+1455667788'}
treadPattern
: 
"L5"
type
: 
"Radial" */}
      {current ? (
        <div onClick={()=>{
          setCurrent(null)
        }} className=" z-10 bg-black/30  flex items-center justify-center absolute left-0 top-0 w-full h-screen">
          <div 
          onClick={(e)=>e.stopPropagation()} className=" p-5   w-[900px] bg-white">
            <p className="text-xl  font-Inter ">
              Tyre Details
            </p>
            <div className="flex flex-col items-center justify-center">
              <img
                className=" w-32"
                src="https://content.jdmagicbox.com/rep/b2b/nylon-truck-tyre/nylon-truck-tyre-1.png?impolicy=queryparam&im=Resize=(360,360),aspect=fit"
                alt=""
              />

              <div className=" flex flex-col py-2 items-center justify-center">
                <p className="text-lg  font-Inter">
                  {current.brand} {current.model}
                </p>

                <p className="text-lg  font-Inter  text-primary">
                  In Stock : {current.quantityInStock}{" "}
                </p>
              </div>
            </div>

            <div  className="px-4">
                
              <p className="text-lg  font-Inter "> 
                Model : {current.model}
              </p>
              <p className="text-lg  font-Inter "> 
              Manufacture Date : {format(current.manufactureDate,'dd-MM-yyyy')}
              </p>
              <p className="text-lg  font-Inter "> 
              Expiry Date : {format(current.expiryDate,'dd-MM-yyyy')}
              </p>

              <p className="text-lg  font-Inter "> 
               Tyre Size: {current.size}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Inventory;
