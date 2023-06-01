const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    municipality: { type: String, required: true },
    date: {
        month: { type: Number, required: true, },
        year: { type: Number, required: true, },
      },
  }, { collection: 'Users' });

const User = mongoose.model('Users', userSchema);

const pepperValue = 'c7a3d8e9b2f541cb18f206e4108761c9';

async function registerUser (formData) {
    try {
        const { name, surname, email, municipality, password } = formData;
        const salt = await bcrypt.genSalt(10);
        // Apply salt and pepper to the password
        const PepperedPassword = password + pepperValue;
        // Hash the password
        const hashedPassword = await bcrypt.hash(PepperedPassword, salt);
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
        return;
    } catch (error) {
        console.error('Error registering user:', error);
        throw new Error('Failed to register user');
    }
}

module.exports = {
    registerUser
};

