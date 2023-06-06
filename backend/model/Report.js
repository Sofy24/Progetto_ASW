const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    date: {
      month: { type: Number, required: true },
      year: { type: Number, required: true }
    },
    quantities: {
      type: [[{ type: String }, { type: Number }, { type: Number }]],
      required: true,
      validate: {
        validator: function (arr) {
          return arr.length === 7;
        },
        message: 'The array should have exactly 7 elements.'
      }
    }
  }, { collection: 'Reports' });

module.exports = mongoose.model('Report', reportSchema);