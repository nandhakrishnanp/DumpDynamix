const mongoose = require('mongoose');

const operatorSchema = new mongoose.Schema({
  operator_id: {
    type: String,
    required: true,
    unique: true,
  },
  token:{
    type:String,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  vehicle_id: {
    type: String,
    ref: 'Vehicle', 
  },
}
);

module.exports = mongoose.model('operator', operatorSchema);
