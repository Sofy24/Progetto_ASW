const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
  name:String,
  is_multiple:Boolean,
  repetition: Number
}, { collection: 'Badges' });

module.exports = mongoose.model('Badges', badgeSchema);
