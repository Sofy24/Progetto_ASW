const User = require('../model/User');
const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');
//const secret_key =  "1a9c77f85d71868e86d7e8a0cfdaf8215b8e687d80442e8f99d7fc7fba5e3d53";
const pepperValue = 'c7a3d8e9b2f541cb18f206e4108761c9';

const handleLogin = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user != null ) {
            //password of the account
            const passwordUser = user.password;
            const salt = user.salt;
            // Apply salt and pepper to the password
            const PepperedPassword = password + pepperValue;
            // Hash the password
            const hashedPassword = await bcrypt.hash(PepperedPassword, salt);
            if (hashedPassword === passwordUser) {
                return res.status(200).json({ message: 'Login eseguito con successo' });
            }
        }
        //unauthorized
        return res.status(401).json({ error: 'Email o Password errate' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Failed to register user' });
    }
};

module.exports = {
    handleLogin
}