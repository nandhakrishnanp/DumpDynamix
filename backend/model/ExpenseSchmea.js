const mongoose = require("mongoose");



const expenseSchema = new mongoose.Schema({
    tyre_id: {
        type: String,
        required: true,
        trim: true,
    },
    cost: {
        type: Number,
        required: true,
        min: 0,
    },
    date: {
        type: Date,
        default:Date.now,
    },
    costReason: { 
        type: String, 
        enum: [
          'Repair', 
          'Puncture', 
          'Replacement', 
          'Alignment/Rotation', 
          'Wear and Tear', 
          'Tread Damage', 
          'Sidewall Damage', 
          'Valve Replacement', 
          'Overload Damage', 
          'Heat Damage', 
          'Accidental Damage', 
          'Retreading'
        ], 
        required: true 
      },
      remarks: { type: String, default: '' },
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
