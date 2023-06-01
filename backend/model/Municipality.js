const mongoose = require('mongoose');

const municipalitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    users: { type: Number, required: true },
}, { collection: 'Municipalities' });

module.exports = mongoose.model('Municipalities', municipalitySchema);