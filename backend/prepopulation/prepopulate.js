const { promisify } = require('util');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const pepperValue = 'c7a3d8e9b2f541cb18f206e4108761c9';
const streetNames = require('./streetNames.js');
const {names, surnames} = require('./names.js');
const Municipality = require('../model/Municipality');
const Typology = require('../model/Typology');
const Badge = require('../model/Badge.js');
const Bin = require('../model/Bin');
const User = require('../model/User');
const Deposit = require('../model/Deposit');


const readFileAsync = promisify(fs.readFile);

const populateDatabase = async () => {
    try {
      await prepopulateDatabase('municipalities', Municipality);
      await Bin.deleteMany({});
      await User.deleteMany({});
    } catch (error) {}
    try {
      await prepopulateDatabase('typologies', Typology);
      await Bin.deleteMany({});
    } catch (error) {}
    try { 
      await prepopulateDatabase('badges', Badge);
    } catch (error) {}
    try {  
      await createBins();
      await Deposit.deleteMany({});
    } catch (error) {}
    try {
        await createUser();
        await Deposit.deleteMany({});
    } catch (error) {}
    try {
        await createDeposits();
    } catch (error) {console.log(error)}
    //following part is only for demonstration purposes during the exam

  }

const prepopulateDatabase = async (filename, Model) => {
  try {
    const dataPath = path.join(__dirname, `${filename}.json`);
    const data = await readFileAsync(dataPath, 'utf8');
    const datas = JSON.parse(data);

    const count = await Model.countDocuments();
    if (count === 0) {
      await Model.insertMany(datas);
      console.log(filename + ' loaded successfully');
    } else {
        throw new Error('Data already exists in the collection. Skipping population.');
    }
  } catch (error) {;
    //console.error('On ' + filename + ' population', error);
    throw error;
  }
};

const createBins = async () => {
    try {
      // Fetch all municipalities
      const municipalities = await Municipality.find();
      // Fetch all typologies
      const typologies = await Typology.find();
      
      const count = await Bin.countDocuments();
      if (count === 0) {
      // Create bins for each municipality and typology combination
        for (const municipality of municipalities) {
            for (const typology of typologies) {
            // Create a new bin
            const bin = new Bin({
                typology: typology._id,
                municipality: municipality._id,
                actual_kg: 0, // Set initial value as needed
                address: generateStreetAddress() // Set address as needed
            });
            // Save the bin to the database
            await bin.save();
            }
        }
        console.log('Bin loaded successfully');
    } else {
        throw new Error('Data already exists in the collection. Skipping population.');
    }
    } catch (error) {
      //console.error('On bins population', error);
      throw error;
    }
}

const generateStreetAddress = () => {
    const randomStreetIndex = Math.floor(Math.random() * streetNames.length);
    const randomStreetName = streetNames[randomStreetIndex];
    const randomStreetNumber = Math.floor(Math.random() * 100) + 1; // Random number between 1 and 100
    return `${randomStreetName} ${randomStreetNumber}`;
};

const createUser = async () => {
    try {
      const municipalities = await Municipality.find(); // Fetch all municipalities
      const count = await User.countDocuments();
      const password = 'Prova99#';
      if (count == 0) {
        for (let i = 0; i < 15; i++) {
            const salt = await bcrypt.genSalt(10);  
            const PepperedPassword = password + pepperValue;
            // Hash the password
            const hashedPassword = await bcrypt.hash(PepperedPassword, salt);
            const municipality = municipalities[Math.floor(Math.random() * municipalities.length)];
            const month = Math.floor(Math.random() * 12) + 1;
            const year = 2022;
            const user = new User({
                name: names[i],
                surname: surnames[i],
                email: `${names[i].toLowerCase()}.${surnames[i].toLowerCase()}@example.com`,
                password: hashedPassword,
                salt,
                municipality: municipality._id,
                date: { month, year }
            });
            await user.save();
        }
        console.log('Users created successfully');
      } else {
        throw new Error('Data already exists in the collection. Skipping population.');
      }
    } catch (error) {
      throw error;
    }
};

const createDeposits = async () => {
    try {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();
        // Fetch all users
        const users = await User.find().populate('municipality');
        const count = await Deposit.countDocuments();
        if (count === 0) {
            // Create deposits for each user, month, and year
            for (const user of users) {
                const { _id, date, municipality } = user;
                const registrationYear = date.year;
                const registrationMonth = date.month;
                
                // Get the bins of the user's municipality
                const bins = await Bin.find({ municipality: municipality._id });
                
                // Generate deposits for each bin
                for (const bin of bins) {
                    let year = registrationYear;
                    for (let month = registrationMonth; month <= currentMonth || currentYear != year ; month++) {
                        if (month > 12) {
                            month = 1; // Reset month to January
                            year++; // Increment year by 1
                        }

                        const randomKg = Math.round((Math.random() * (0.4 - 0.1) + 0.1) * 100) / 100;
                        // Create a new deposit
                        const deposit = new Deposit({
                        user: _id,
                        kg: randomKg,
                        bin: bin._id,
                        createdAt: new Date(year, month - 1, 15, 18, 0, 0) // 15th day of the month at 6pm
                        });
                        // Save the deposit to the database
                        await deposit.save();
                        //update the kg in the bin
                        bin.actual_kg += randomKg;
                        await bin.save();
                    }
                }
            }
            
            console.log('Deposits created successfully');
        } else {
            throw new Error('Data already exists in the collection. Skipping population.');
        }
    } catch (error) {
        throw error;
    }
};

module.exports = {
    prepopulateDatabase,
    populateDatabase
  }