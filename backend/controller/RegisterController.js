const User = require('../model/User');
const Municipality = require('../model/Municipality');
const bcrypt = require('bcrypt');
const pepperValue = 'c7a3d8e9b2f541cb18f206e4108761c9';
const handleRegistration = async (req, res) => {
    try {
        const { name, surname, email, municipality, password } = req.body;

        const nameRegex = /^[A-Za-z]+$/;
        if (name == null || name.length === 0 || !nameRegex.test(name)) {
            return res.status(400).json({ error: 'Nome assente o errato' });
        }
        
        const surnameRegex = /^[A-Za-z]+$/;
        if (surname == null || surname.length === 0 || !surnameRegex.test(surname)) {
            return res.status(400).json({ error: 'Cognome assente o errato' });
        }
        
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (email == null || email.length === 0 || !emailRegex.test(email)) {
            return res.status(400).json({ error: 'Email assente o errata' });
        }
        
        const municipalities = await Municipality.find({}, 'name');
        const municipalityNames = municipalities.map(mun => mun.name);
        if (municipality == null || municipality.length === 0 || !municipalityNames.includes(municipality)) {
            return res.status(400).json({ error: 'Comune assente o errato' });
        }

        const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[+#?!@$ %^&*-]).{8,}$/;
        if (password == null || !passwordRegex.test(password)) {
            return res.status(400).json({ error: 'Password assente o errata' });
        }

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
        // Get muicipality 
        const correctMunicipality = await Municipality.findOne({ name: municipality });
        // Create a new user document
        const user = new User({
            name,
            surname,
            email,
            password: hashedPassword,
            salt, 
            municipality: correctMunicipality._id,
            date: {
                month,
                year,
              },
        });
        // Save the user document to the database
        await user.save();
        // Update the municipality by incrementing the users count
        await Municipality.updateOne({ _id: correctMunicipality._id }, { $inc: { users: 1 } });
        
        return res.status(200).json({ message: 'Registrazione eseguita con successo' });
        } catch (error) {
            //console.error('Error registering user:', error);
            res.status(500).json({ error: 'Failed to register user' });
        }
};

module.exports = {
    handleRegistration
}