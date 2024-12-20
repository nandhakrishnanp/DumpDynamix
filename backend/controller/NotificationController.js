
const PressureSuggtion = require("../llm/PressureNotification");
const Notification = require ("../model/NotificationRoute");
const TyreSchemea = require("../model/TyreSchemea");





const fetchNotificationByVechicleId = async(req,res)=>{
    try {
        const notifications = await Notification.find({vehicle_id:req.params.id}).sort({createdAt:-1});
        res.json(notifications).status(200);
    } catch (error) {
        res.json({ message: error.message }).status(404);
    }
}


const fetchAllNotification = async(req,res)=>{
    try {
        const notifications = await Notification.find().sort({createdAt:-1});
        res.json(notifications).status(200);
    } catch (error) {
        res.json({ message: error.message }).status(404);
    }
}



const getFailureSuggtion = async (req,res)=>{

      const { data } = req.body;
        console.log(data.data);
        
      const tyre_id = data.tyre_id;
      const tyreData = await TyreSchemea.findOne({tyre_id:tyre_id});
        console.log("TyreData",tyreData);
    
        if(!tyreData){
          return res.json({
            response: "error"
        }).status(200);
        }
      const  response = await PressureSuggtion({ data , tyreData  })
     
      if(response){
              console.log("res",response);
              
          return res.json({
         response
          }).status(200)
      }
      else{
        return res.json({
            response: "error"
        }).status(200);
      }

}
module.exports = {fetchNotificationByVechicleId , fetchAllNotification ,getFailureSuggtion}