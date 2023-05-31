const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    salt: String,
    municipality: String,
  });