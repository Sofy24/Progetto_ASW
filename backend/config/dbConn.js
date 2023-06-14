const mongoose = require('mongoose');

//connection to the db
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://0.0.0.0:27017/He')
        .then(() => {
            console.log('Connected to MongoDB');
        })
    } catch (e) {
        e => console.error('Error connecting to MongoDB:', e);
    }
}


module.exports = connectDB