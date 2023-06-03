const mongoose = require('mongoose');

const depositSchema = new mongoose.Schema({
  user:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
      required: true
  },
  kg:Number,
  bin: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Bins", 
      required: true }
  },{timestamps: { currentTime: ()=> {
    var utc = new Date();
    utc.setHours( utc.getHours() + 2);
    return utc
  } }}, { collection: 'Deposit' });

module.exports = mongoose.model('Deposit', depositSchema);
