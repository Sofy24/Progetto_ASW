const mongoose = require('mongoose');

const municipalitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    users: { type: Number, required: true },
}, { collection: 'Municipalities' });
  
const Municipality = mongoose.model('Municipalities', municipalitySchema);

async function getAllMunicipalityNames() {
    try {
        const municipalities = await Municipality.find({}, 'name');
        const municipalityNames = municipalities.map(mun => mun.name);
        municipalityNames.sort((a, b) => a.localeCompare(b));
        return municipalityNames;
    } catch (error) {
        console.error('Error retrieving municipalityNames:', error);
        throw new Error('Failed to retrieve municipalityNames');
    }
}

module.exports = {
    getAllMunicipalityNames
};
