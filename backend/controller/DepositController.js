const Deposit = require('../model/Deposit');
const Bin = require('../model/Bin');
const Typology = require('../model/Typology');
const Notification = require('../model/Notification')
const User = require('../model/User');

const handleDeposit = async (req, res) => {
    const { email, kg, binId } = req.body;
    try {
        //Obtain user
        const user = await User.findOne({ email });
        // Fetch the bin and typology details based on the provided binId
        const bin = await Bin.findById(binId);
        if (bin == null) {
            return res.status(404).json({ error: 'Bin not found' });
        }
        const typology = await Typology.findById(bin.typology);
        if (typology == null) {
            return res.status(404).json({ error: 'Typology not found' });
        }
        const {actual_kg } = bin;
        // Calculate the total weight after the deposit
        const totalWeight = kg + actual_kg;
        // Check if the total weight exceeds the typology's maximum weight limit
        if (totalWeight > typology.max_kg) {
            return res.status(400).json({ error: 'Weight limit exceeded' });
        }
        // Create the deposit record
        const deposit = new Deposit({
            user: user._id,
            kg,
            bin: binId,
        });
        // Save the deposit to the database
        await deposit.save();
        // Update the actual_kg in the bin
        bin.actual_kg = totalWeight;
        await bin.save();
        // Creating Notification
        const depositPrice = Math.round((kg * typology.price_kg ) * 100) / 100;
        const currentDate = new Date();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        const notification = new Notification({
            email,
            date: {
                month,
                year
            },
            type: "deposit",
            isRead: false,
            text: "Hai consegnato " + typology.name + " di peso " + kg + "kg in " + bin.address +". Questo ti verrà a costare " + depositPrice + " euro."   
        })
        await notification.save()
        return res.status(201).json(deposit);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    handleDeposit
  }