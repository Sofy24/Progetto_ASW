const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
const fs = require('fs');
const path = require('path');
const connectDB = require('./config/dbConn');
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use(cors());

connectDB();
//routes
app.use('/', require('./router/root'));
app.use('/notification', require('./router/notificationRoute'));
app.use('/municipality', require('./router/municipalityRoute'));
app.use('/register', require('./router/registerRoute'));
app.use('/login', require('./router/loginRoute'));



//NON CANCELLARE 
// Funzione per popolare il db, cambire il nome del file json e lo schema sulla base si cosa si inserisce e decommentare loadData() nella connessione  
function loadData() {
  const areasDataPath = path.join(__dirname, 'comuni.json');
  fs.readFile(areasDataPath, 'utf8', (error, data) => {
    if (error) {
      console.error('Error reading data file:', error);
      process.exit(1);
    }
    
    const areas = JSON.parse(data);
    
    // Define the area schema and model (similar to the previous examples)
        const areaSchema = new mongoose.Schema({
          name: { type: String, required: true },
          users: { type: Number, required: true },
        }, { collection: 'Municipalities' });
        const Area = mongoose.model('Area', areaSchema);
    
        // Use insertMany() to insert the areas into the collection
        Area.insertMany(areas)
          .then(() => {
            console.log('Data loaded successfully');
            mongoose.disconnect();
          })
          .catch((error) => {
            console.error('Error loading data:', error);
            mongoose.disconnect();
          });
      });
    }   

//DA QUI IN POI SI PUO' CANCELLARE SE SERVE
function loadData2() {
  const areasDataPath = path.join(__dirname, 'tipologie.json');
  fs.readFile(areasDataPath, 'utf8', (error, data) => {
    if (error) {
      console.error('Error reading data file:', error);
      process.exit(1);
    }
    
    const areas = JSON.parse(data);
    
    // Define the area schema and model (similar to the previous examples)
        const areaSchema = new mongoose.Schema({
          name: { type: String, required: true },
          max_kg: { type: Number, required: true },
        }, { collection: 'Typology' });
        const Area = mongoose.model('Area', areaSchema);
    
        // Use insertMany() to insert the areas into the collection
        Area.insertMany(areas)
          .then(() => {
            console.log('Data loaded successfully');
            mongoose.disconnect();
          })
          .catch((error) => {
            console.error('Error loading data:', error);
            mongoose.disconnect();
          });
      });
    }   
const areasDataPath = path.join(__dirname, 'bidoni.json');
//createData(areasDataPath)
function createData(path){
  var values="["
  for(var i=0;i<30;i++){
    if(i!=0){
      values.concat(",")
    }
    values.concat({"typology":{
      "type":"",
      "ref":"Typology",
      "required": true
  },
  "actual_kg":0,
  "adress":"via 31 febbraio",
  "municipality": { 
      "type": "", 
      "ref": "Municipalities", 
      "required": true }
    })
  }
  values.concat("]")
  JSON.writeFile(path,values)
}

function loadData3() {
  
  const areasDataPath = path.join(__dirname, 'bidoni.json');
  createData(areasDataPath);
  fs.readFile(areasDataPath, 'utf8', (error, data) => {
    if (error) {
      console.error('Error reading data file:', error);
      process.exit(1);
    }
    
    const areas = JSON.parse(data);
    
    // Define the area schema and model (similar to the previous examples)
        const areaSchema = new mongoose.Schema({
          typology:{
              type:"",
              ref:"Typology",
              required: true
          },
          actual_kg:Number,
          adress:String,
          municipality: { 
              type: "", 
              ref: "Municipalities", 
              required: true }
      }, { collection: 'Bins' });
        const Area = mongoose.model('Area', areaSchema);
    
        // Use insertMany() to insert the areas into the collection
        Area.insertMany(areas)
          .then(() => {
            console.log('Data loaded successfully');
            mongoose.disconnect();
          })
          .catch((error) => {
            console.error('Error loading data:', error);
            mongoose.disconnect();
          });
      });
    }   

app.get('/datacolumn', async (req, res) => {
  try {
    const valori = ""

    res.json(valori);
  } catch (error) {
    console.error('Error retrieving municipalities:', error);
    res.status(500).json({ error: 'Failed to retrieve municipalities' });
  }
});


app.get('/options', async (req, res) => {
  try {
    const municipalityNames = "";
    res.json(municipalityNames);
  } catch (error) {
    console.error('Error retrieving municipalities:', error);
    res.status(500).json({ error: 'Failed to retrieve municipalities' });
  }
});

app.get('/dataradar', async (req, res) => {
  try {
    const data = [[80, 50, 30, 40, 100, 20,100],[20, 30, 40, 80, 20, 80,50]];
    res.json(data);
  } catch (error) {
    console.error('Error retrieving municipalities:', error);
    res.status(500).json({ error: 'Failed to retrieve municipalities' });
  }
});


//NON CANCELLARE
const PORT = 3000;
app.listen(PORT,() =>{
  console.log('Node API server started on port '+PORT);
});

/*mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}); */

