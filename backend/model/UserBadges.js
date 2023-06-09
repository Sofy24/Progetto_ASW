const mongoose = require('mongoose');

const userBadgesSchema = new mongoose.Schema({
  user:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
      required: true
  },
  badge: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Badges", 
      required: true 
  },
  createdAt: {
    type: Date,
    default: () => {
      var utc = new Date();
      utc.setHours(utc.getHours() + 2);
      return utc;
    }
  }
  }, { collection: 'UserBadges' });

module.exports = mongoose.model('UserBadges', userBadgesSchema);
