const mongoose = require('mongoose');

//global.appRoot = path.resolve(__dirname);
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://0.0.0.0:27017/He')
        .then(() => {
            console.log('Connected to MongoDB');
            //loadData();
        })
    } catch (e) {
        e => console.error('Error connecting to MongoDB:', e);
    }
}

/*mongoose.connect('mongodb://0.0.0.0:27017/He')
  .then(() => {
    console.log('Connected to MongoDB');
    //loadData();
  })
  .catch((e)=>console.error('Error connecting to MongoDB:', e));*/

module.exports = connectDB