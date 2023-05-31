//forse è typescript
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
const fs = require('fs');
const path = require('path');
//const moviesRouter = require('./src/routes/moviesRoutes');
//query 
const municipalityService = require('./query/municipalityService');



global.appRoot = path.resolve(__dirname);
const PORT = 3000;

mongoose.connect('mongodb://0.0.0.0:27017/He')
  .then(() => {
    console.log('Connected to MongoDB');
    //loadData();
  })
  .catch((e)=>console.error('Error connecting to MongoDB:', e));

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

app.use(cors());
app.use('/static', express.static(path.join(__dirname, 'public')));

//Per gestire i parametri passati nel corpo della richiesta http.

app.use(express.json());
//app.use('/movies',moviesRouter);


/*app.use((req, res)=> {
  res.status(404).send({url: req.originalUrl + ' not found'})
});*/

//get municipality names
app.get('/municipality/names', async (req, res) => {
  try {
    const municipalityNames = await municipalityService.getAllMunicipalityNames();
    res.json(municipalityNames);
  } catch (error) {
    console.error('Error retrieving municipalities:', error);
    res.status(500).json({ error: 'Failed to retrieve municipalities' });
  }
});

//register user
app.post('/user/register', async (req, res) => {
  try {
  const formData = req.body;
  console.log(formData);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});


app.listen(PORT,() =>{
  console.log('Node API server started on port '+PORT);
});


