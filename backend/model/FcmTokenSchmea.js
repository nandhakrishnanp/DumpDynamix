const mongoose = require('mongoose');




const FcmTokenSchmea = new mongoose.Schema({
    token:{
        type:String,
        required:true
    },
    operator_id:{
        type:String,
        required:true
    }
})


module.exports = mongoose.model('FcmToken',FcmTokenSchmea)