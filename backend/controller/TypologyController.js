const Typology = require('../model/Typology');

const handleTypologyPrice = async (req, res) => {
    try {
        const typologies = await Typology.find({}, { name: 1, price_kg: 1 }).lean().exec();

        // Convert the result to an array of objects
        const typologiesArray = typologies.map(typology => ({
          name: typology.name,
          price_kg: typology.price_kg
        }));
        console.log("PREZZI BASSI E FISSI: " + typologiesArray[0].name)
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