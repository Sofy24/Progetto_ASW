const User = require('../model/User');
const bcrypt = require('bcrypt');
const pepperValue = 'c7a3d8e9b2f541cb18f206e4108761c9';

const handleLogin = async (req, res) => {
    try {
        console.log(req.body);
        //const { email, password } = formData;
        //const user = await User.findOne({ email });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Failed to register user' });
    }
};

module.exports = {
    handleLogin
}