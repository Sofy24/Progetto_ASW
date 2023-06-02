const User = require('../model/User');
const bcrypt = require('bcrypt');
const pepperValue = 'c7a3d8e9b2f541cb18f206e4108761c9';
const handleRegistration = async (req, res) => {
    try {
        const { name, surname, email, municipality, password } = req.body;
        //check if email is already used
        const otheruser = await User.findOne({ email });
        if (otheruser != null) {
            return res.status(409).json({ error: 'Email già registrata' });
        }
        const salt = await bcrypt.genSalt(10);
        // Apply salt and pepper to the password
        const PepperedPassword = password + pepperValue;
        // Hash the password
        const hashedPassword = await bcrypt.hash(PepperedPassword, salt);
        // Get date
        const currentDate = new Date();
        const month = currentDate.getMonth() + 1; //1 based
        const year = currentDate.getFullYear();
        // Create a new user document
        const user = new User({
            name,
            surname,
            email,
            password: hashedPassword,
            salt, 
            municipality,
            date: {
                month,
                year,
              },
        });
        // Save the user document to the database
        await user.save();
        return res.status(200).json({ message: 'Registrazione eseguita con successo' });
        } catch (error) {
          console.error('Error registering user:', error);
          res.status(500).json({ error: 'Failed to register user' });
        }
};

module.exports = {
    handleRegistration
}