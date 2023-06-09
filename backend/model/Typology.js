const mongoose = require('mongoose');

const typologySchema = new mongoose.Schema({
    name: { type: String, required: true },
    max_kg: { type: Number, required: true },
    price_kg:  { type: Number, required: true }
}, { collection: 'Typology' });

module.exports = mongoose.model('Typology', typologySchema);