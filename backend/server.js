const express = require('express');
const app = express();
const mongoose = require('mongoose')
//var random = require('mongoose-random');
const cors = require('cors')
const fs = require('fs');
const path = require('path');
const connectDB = require('./config/dbConn');
const populator = require('./prepopulation/prepopulate');
const http = require('http');
const { handleSocketConnections } = require('./socketController');
app.use(cors());

//NON CANCELLARE
const startServer = async () => {
  try {
    await populator.populateDatabase();
  } catch (error) {console.log("FAIL"+error)}
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log('Node API server started on port ' + PORT);
  });

  //socket.io
  const server = http.createServer(app);
  handleSocketConnections(server);
  const port = 8080; 
  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};

startServer();





app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.json());
connectDB();
//routes
app.use('/', require('./router/root'));
app.use('/notification', require('./router/notificationRoute'));
app.use('/binState', require('./router/binsStateRoute'));
app.use('/municipality', require('./router/municipalityRoute'));
app.use('/register', require('./router/registerRoute'));
app.use('/login', require('./router/loginRoute'));
//app.use('/graph/general',require('./router/graphRoute'));
app.use('/user', require('./router/userRoute'));
app.use('/report', require('./router/reportRoute'));
app.use('/badge', require('./router/badgeRoute'));
app.use('/typology', require('./router/typologyRoute'));


//DA QUI IN POI FUFFA



// UNCOMMENT THIS TO CREATE TYPOLOGY OF WASTE FOR THE FIRST TIME!
//loadData2();
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

// UNCOMMENT THIS TO CREATE BADGES FOR THE FIRST TIME!
//loadData3();
function loadData3() {
  const areasDataPath = path.join(__dirname, 'badges.json');
  fs.readFile(areasDataPath, 'utf8', (error, data) => {
    if (error) {
      console.error('Error reading data file:', error);
      process.exit(1);
    }
    
    const areas = JSON.parse(data);
    
    // Define the area schema and model (similar to the previous examples)
    const areaSchema = new mongoose.Schema({
      name: { type: String, required: true },
      is_multiple: { type: Boolean, required: true },
      repetition:{type: Number, required: false}
    }, { collection: 'Badges' });
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


// UNCOMMENT THIS TO CREATE BINS FOR THE FIRST TIME!
//createData();
function createData(){

  const Bin = require('./model/Bin');
  const Municipality = require('./model/Municipality');
  const Typology = require('./model/Typology');
  
  var random = 0
  Municipality.count().then( (count) =>{
    console.log(count);
    for(var i=0;i<30;i++){
      const via = "via ".concat(i+1).concat(" luglio");
      
      random= Math.floor(Math.random() * count);

      Municipality.findOne().skip(random).then( ( result) =>{

        var pippo = result._id;
        Typology.count().then( (count2) =>{
          random = Math.floor(Math.random() * count2);

          Typology.findOne().skip(random).then( ( resulttypology) =>{
            
            

            const bin = new Bin({
              typology:resulttypology._id,
              actual_kg:0,
              adress: via,
              municipality: result._id,
            });
            bin.save();
            
          }).catch((err) => {});

        });
        
        
      }).catch((err) => {});
      
    }
  }).catch((err) => {});
  
  
}
// CREO 1 DEPOSITO DI PROVA, andranno creati ogni tot su utenti e bidoni diversi
//setTimeout(create1deposit,10000)
//create1deposit();
function create1deposit(){
  const Bin = require('./model/Bin');
  const User = require('./model/Municipality');
  //const Typology = require('./model/Typology');
  const Deposit = require('./model/Deposit');

  //console.log(mongoose.Types.ObjectId('6479f8a6117b966054dc1a14'));
  //var u = User.findById('6479f8a6117b966054dc1a14')._id
  //var b = Bin.findOne({_id:ObjectId('6479f541056369bd03bbaf0f')})._id
  const deposit = new Deposit({
    user:'6482d383f29eff4b92b8a5bb',
    kg:2,
    bin: '6482d254d401fe210923898c' ,
  });
  deposit.save();
  console.log("deposited")
}
/*
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
});*/
/*
app.get('/dataradar', async (req, res) => {
  try {
    const data = [[80, 50, 30, 40, 100, 20,100],[20, 30, 40, 80, 20, 80,50]];
    res.json(data);
  } catch (error) {
    console.error('Error retrieving municipalities:', error);
    res.status(500).json({ error: 'Failed to retrieve municipalities' });
  }
});*/







