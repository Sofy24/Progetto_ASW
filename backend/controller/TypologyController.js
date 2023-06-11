const Typology = require('../model/Typology');

const handleTypologyPrice = async (req, res) => {
    try {
        const typologies = await Typology.find({});
        const typologiesArray = typologies.map(typology => [typology.name, typology.price_kg]);
        // Return the typologies data as an array
        res.json(typologiesArray);
    } catch (error) {
        // Handle any errors
        res.status(500).json({ error: 'Failed to retrieve typologies' });
    }
};

module.exports = {
    handleTypologyPrice
}