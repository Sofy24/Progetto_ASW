const User = require('../model/User');
const bcrypt = require('bcrypt');
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
            if (password === passwordUser) {
                return res.status(200).json({ message: 'Login eseguito con successo' });
            }
        }
        //unauthorized
        return res.status(401).json({ message: 'Email o Password errate' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Failed to register user' });
    }
};

module.exports = {
    handleLogin
}