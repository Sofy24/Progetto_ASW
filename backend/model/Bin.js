const mongoose = require('mongoose');

const binSchema = new mongoose.Schema({
  typology:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"Typology",
      required: true
  },
  actual_kg:Number,
  adress:String,
  municipality: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Municipalities", 
      required: true }
  }, { collection: 'Bins' });

module.exports = mongoose.model('Bins', binSchema);
