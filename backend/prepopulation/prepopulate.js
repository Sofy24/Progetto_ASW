const { promisify } = require('util');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const streetNames = require('./streetNames.js');
const Municipality = require('../model/Municipality');
const Typology = require('../model/Typology');
const Badge = require('../model/Badge.js');
const Bin = require('../model/Bin');


const readFileAsync = promisify(fs.readFile);

const populateDatabase = async () => {
    try {
      await prepopulateDatabase('municipalities', Municipality);
      await Bin.deleteMany({});
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
    } catch (error) {}

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

module.exports = {
    prepopulateDatabase,
    populateDatabase
  }