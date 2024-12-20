const mongoose = require('mongoose');




const NotificationSchema = new mongoose.Schema({
    notification_id:{
        type:String,
        required:true
    },
    notification_Type:{
        type:String,
        required:true
    },
    vehicle_id:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    read:{
        type:Boolean,
        default:false
    },
    tyre_id:{
        type:String,
        default:null
    }
},{
    timestamps:true  
})



module.exports = mongoose.model('Notification',NotificationSchema)
