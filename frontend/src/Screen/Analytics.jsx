import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";
import TopTyreCharts from "../Components/TopTyreCharts";
import LeastTyre from "../Components/LeastPerFormingTyre";
import TyreCostChart from "../Components/TopCostChart";
import PerformanceScoresChart from "../Components/PerformanceChart";

const Analytics = () => {
  const [topTrucks, setTopTrucks] = useState(null);
  const [leastTrucks, setLeastTrucks] = useState(null);
  const [topCost, setTopCost] = useState(null);
  const [selected,setSelected] =useState(null);
  const [Performance , setPermormance] =useState(null);


  const fetchTopTrucks = async () => {
    const res = await axiosInstance.get("/expense/topTyres");
    const data = await res.data;
    console.log(data);

    setTopTrucks(data);
  };

  const fecthLeastTrucks = async () => {
    const res = await axiosInstance.get("/expense/leastTyres");
    const data = await res.data;
    console.log(data);
    setLeastTrucks(data);
  };

  const fetchTopCost = async () => {
    const res = await axiosInstance.get("/expense/topcost");
    const data = await res.data;
    console.log(data);
    setTopCost(data);
  };

  const fetchtyrePerformance = async ()=>{
    const res = await axiosInstance.get('/expense/performance')
    const data = await res.data;
    console.log(data);
    setPermormance(data);
    
  }

  useEffect(()=>{
    if(topCost && !selected){
      setSelected(topCost[0])
    }
  },[topCost])

  useEffect(() => {
    fetchTopTrucks();
    fecthLeastTrucks();
    fetchTopCost();
    fetchtyrePerformance()
  }, []);

  useEffect(() => {
    console.log("Hello EveryOne");
  }, []);

  return (
    <div className="bg-gray-200/90 w-full h-screen  overflow-y-scroll">
      <h1 className="font-bold  font-Inter text-2xl m-3">Analytics</h1>

      <div className=" p-2 px-3">
        <div>
          <div className=" flex gap-1">
            <div className=" px-3 m-3">
              <p className=" text-xl font-Inter font-bold text-primary">
                Top Performing Tyres{" "}
              </p>
              <p className=" text-lg font-Inter">
                Based on Cost Per Working Hour
              </p>
            </div>
            <img
              className=" w-12 object-contain"
              src="https://static.vecteezy.com/system/resources/previews/041/644/009/non_2x/3d-green-upward-trend-arrow-icon-png.png"
              alt=""
            />
          </div>

          <div className=" mt-8">
            {topTrucks ? (
              <TopTyreCharts data={topTrucks} />
            ) : (
              <div>
                <p className="text-lg font-Inter">Loading...</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className=" p-2 px-3">
        <div>
          <div className=" flex">
            <div className=" px-3 m-3">
              <p className=" text-xl font-Inter font-bold text-primary">
                Least Performing Tyres{" "}
              </p>
              <p className=" text-lg font-Inter">
                Based on Cost Per Working Hour
              </p>
            </div>
            <img
              className=" w-12 object-contain"
              src="https://static.vecteezy.com/system/resources/thumbnails/041/644/160/small_2x/3d-red-downward-trend-arrow-icon-png.png"
              alt=""
            />
          </div>
          <div className=" mt-8">
            {leastTrucks ? (
              <LeastTyre data={leastTrucks} />
            ) : (
              <div>
                <p className="text-lg font-Inter">Loading...</p>
              </div>
            )}
          </div>
        </div>
      </div>


      <div className=" p-2 px-3">

      <div className=" flex ">
            <div className=" px-3 m-3">
              <p className=" text-xl font-Inter font-bold text-primary">
              Trucks with Higher Maintenance Costs
              </p>
              <p className=" text-lg font-Inter">
                Based on Expense Trend
              </p>
            </div>
            <img
              className=" w-20  object-contain"
              src="https://static.vecteezy.com/system/resources/previews/045/716/663/non_2x/red-indian-rupee-currency-icon-isolated-inr-3d-rendering-png.png"
              alt=""
            />
          </div>

           {
            topCost ? <div  className=" flex ">
              {topCost.map((tyre) => (
                <div onClick={()=>{
                  setSelected(tyre)
                }} key={tyre.tyre_id} className={`${selected==tyre ? "bg-violet-50" : "bg-white/80"}   cursor-pointer hover:bg-white/80 rounded-lg shadow-md p-3 m-2`}>
                  <p className="text-md font-Inter font-bold text-primary">
                    {tyre.tyre_make} (ID: {tyre.tyre_id})
                  </p>
                  <p className="text-sm font-Inter">
                  Miscellaneous Cost: {tyre.Miscellaneous_cost} Rs
                  </p>
                </div>
              ))}
            </div> : <div>
              <p className="text-lg font-Inter">Loading...</p>

            </div>
           }

         

          {
            selected && <div  className="mt-3 p-5 flex flex-col justify-center items-center">

              <TyreCostChart data={selected.data} /> 


                 <p className=" font-Inter p-3">Expense Trend Of Tyre : {selected.tyre_id}</p>
              </div>
          }



      </div>
     
     <div   className=" p-2 px-3"  >
     <div className=" flex ">
            <div className=" px-3 m-3">
              <p className=" text-xl font-Inter font-bold text-primary">
              Brands Performance
              </p>
              <p className=" text-lg font-Inter">
                Based on Historical Failures
              </p>
            </div>
            <img
              className=" w-20  object-contain"
              src="https://png.pngtree.com/png-vector/20220809/ourmid/pngtree-top-brand-badge-png-image_6104789.png"
              alt=""
            />
          </div>
     </div>
   
      <div className=" flex flex-col items-center justify-center p-5">


        {
          Performance && <PerformanceScoresChart performanceData={Performance} />
        }
           
      </div>
    </div>
  );
};

export default Analytics;
