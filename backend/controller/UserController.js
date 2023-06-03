const User = require('../model/User');
const jwt = require('jsonwebtoken');
const secretKey =  "1a9c77f85d71868e86d7e8a0cfdaf8215b8e687d80442e8f99d7fc7fba5e3d53";

const handleVerification = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
  
    try {
        console.log(token);
      // Verify the token
      const decoded = jwt.verify(token, secretKey);
  
      // Check if the token is expired
      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp < currentTime) {
        return res.status(401).json({ error: 'Token expired' });
      }
  
      // Extract the user's ID and email from the decoded token
      const { id, email } = decoded;
  
        // Query the database to find the user with the given email
        const user = await User.findOne({ email });

        if (user == null) {
            return res.status(404).json({ error: 'User not found' });
        }
      // Return a success response
      return res.status(200).json({ id, email });
    } catch (error) {
      // Handle token verification errors (e.g., invalid token, signature verification failed)
      console.error('Token verification error:', error);
      return res.status(401).json({ error: 'Invalid token' });
    }
  };

module.exports = {
    handleVerification
}