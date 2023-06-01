const Municipality = require('../model/Municipality');
const handleMunicipalitiesNames = async (req, res) => {
    try {
        const municipalities = await Municipality.find({}, 'name');
        const municipalityNames = municipalities.map(mun => mun.name);
        municipalityNames.sort((a, b) => a.localeCompare(b));
        res.json(municipalityNames);
      } catch (error) {
        console.error('Error retrieving municipalities:', error);
        res.status(500).json({ error: 'Failed to retrieve municipalities' });
      }
};

module.exports = {
    handleMunicipalitiesNames
}