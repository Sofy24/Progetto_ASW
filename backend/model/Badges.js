const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
  name:String,
  is_multiple:Boolean,
  repetition: Number
}, { collection: 'Badge' });

module.exports = mongoose.model('Badge', badgeSchema);
