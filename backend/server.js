const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
const fs = require('fs');
const path = require('path');
const connectDB = require('./config/dbConn');
const municipalityService = require('./query/municipalityService');
const userService = require('./query/userService');app.use(cors());
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.json());


connectDB();
//routes
app.use('/', require('./router/root'));
app.use('/notification', require('./router/notificationRoute'));




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




app.get('/datacolumn', async (req, res) => {
  try {
    const municipalityNames = [
      {
        x: '2011',
        y: 1292,
        goals: [
          {
            name: 'Expected',
            value: 1400,
            strokeHeight: 5,
            strokeColor: '#775DD0'
          }
        ]
      },
      {
        x: '2012',
        y: 4432,
        goals: [
          {
            name: 'Expected',
            value: 5400,
            strokeHeight: 5,
            strokeColor: '#775DD0'
          }
        ]
      },
      {
        x: '2013',
        y: 5423,
        goals: [
          {
            name: 'Expected',
            value: 5200,
            strokeHeight: 5,
            strokeColor: '#775DD0'
          }
        ]
      },
      {
        x: '2014',
        y: 6653,
        goals: [
          {
            name: 'Expected',
            value: 6500,
            strokeHeight: 5,
            strokeColor: '#775DD0'
          }
        ]
      },
      {
        x: '2015',
        y: 8133,
        goals: [
          {
            name: 'Expected',
            value: 6600,
            strokeHeight: 13,
            strokeWidth: 0,
            strokeLineCap: 'round',
            strokeColor: '#775DD0'
          }
        ]
      },
      {
        x: '2016',
        y: 7132,
        goals: [
          {
            name: 'Expected',
            value: 7500,
            strokeHeight: 5,
            strokeColor: '#775DD0'
          }
        ]
      },
      {
        x: '2017',
        y: 7332,
        goals: [
          {
            name: 'Expected',
            value: 8700,
            strokeHeight: 5,
            strokeDashArray: 2,
            strokeColor: '#775DD0'
          }
        ]
      },
      {
        x: '2018',
        y: 6553,
        goals: [
          {
            name: 'Expected',
            value: 7300,
            strokeHeight: 2,
            strokeDashArray: 2,
            strokeColor: '#775DD0'
          }
        ]
      }
    ];

    res.json(municipalityNames);
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
  if (await userService.registerUser(req.body)) {
    console.log("true");
    return res.status(200).json({ message: 'Registrazione eseguita con successo' });
  } else {
    console.log("false");
    return res.status(409).json({ error: 'Email già registrata' });
  }
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});
//login user
app.post('/login', async (req, res) => {
  console.log(req.body);
});

const PORT = 3000;
app.listen(PORT,() =>{
  console.log('Node API server started on port '+PORT);
});

/*mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}); */

