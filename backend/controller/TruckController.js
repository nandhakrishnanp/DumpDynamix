const OperatorSchmea = require("../model/OperatorSchmea");
const TkphHistory = require("../model/TkphHistory");
const TyreSchemea = require("../model/TyreSchemea");
const VechicleSchmea = require("../model/VechicleSchmea");


const getAllTruckData = async (req, res) => {
    try {
        const truckData = await VechicleSchmea.find();
        res.json(truckData).status(200);
    } catch (error) {
        res.json({ message: error.message }).status(404);
    }
    }



const  getClusturedData = async(req,res)=>{
       console.log("getClusturedData");
         
        const vechicle_id = req.params.id;
        const truckData = await VechicleSchmea.findOne({vehicle_id:vechicle_id});
        const tyreData = await TyreSchemea.find({vehicle_id:vechicle_id});

        const pressureData = tyreData.map((tyre)=>{
            return {
                tyre_id:tyre.tyre_id,
                pressure: tyre.tyre_pressure,
                standard_pressure: tyre.standard_psi,
                tyre_position : tyre.tyre_position
                ,
                
            }
        }
        )


        const loadData = {
            
current_speed: truckData.current_speed,
maximum_payload: truckData.maximum_payload,

payload_in_tones: truckData.payload_in_tones,
        }



        res.json({loadData,pressureData}).status(200);

    }


const getTruckById = async(req,res)=>{
        try {
            const truckData = await VechicleSchmea.findOne({vehicle_id:req.params.id});
            const opearordata = await OperatorSchmea.findOne({operator_id:truckData.operator_id}).select("-password");

             
            res.json({truckData,opearordata}).status(200);
        } catch (error) {
            res.json({ message: error.message }).status(404);
        }

    }


const getTyreDataByTruck = async(req,res)=>{
        try {
            const vechicle_id = req.params.id;
            
            const tyreData = await TyreSchemea.find({vehicle_id:  vechicle_id});
            res.json(tyreData).status(200);
        }
        catch (error) {
            res.json({ message: error.message }).status(404);
        }
    }


const getTyreDataByTyre = async(req,res)=>{
        try {
            const tyre_id = req.params.id;
            
            const tyreData = await TyreSchemea.findOne({ tyre_id:  tyre_id});
            res.json(tyreData).status(200);
        }
        catch (error) {
            res.json({ message: error.message }).status(404);
        }
    }  


const getTKPHHistoryById = async(req,res)=>{
        const vechicle_id = req.params.vehicle_id
        console.log(vechicle_id)
          const history =await TkphHistory.findOne({vehicle_id:vechicle_id});
          res.json({
            history
          }).status(200);
    }



module.exports= {getTKPHHistoryById, getAllTruckData  , getTruckById ,getTyreDataByTruck , getTyreDataByTyre , getClusturedData} ;