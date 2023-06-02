const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    municipality: { type: String, required: true },
    date: {
        month: { type: Number, required: true },
        year: { type: Number, required: true }
      }
  }, { collection: 'Users' });

module.exports = mongoose.model('Users', userSchema);
