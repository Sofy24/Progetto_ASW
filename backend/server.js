const express = require('express');
const app = express();
const mongoose = require('mongoose')
//var random = require('mongoose-random');
const cors = require('cors')
const fs = require('fs');
const path = require('path');
const connectDB = require('./config/dbConn');


const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });



httpServer.listen(3001);

io.on("connection", (socket) => {
  socket.emit("hello", "world");
});
/*
const Http = require("http").Server(express);
const Socketio = require("socket.io")(Http, {
  cors: {
    origin: "http://localhost:3001",
  },
});
Http.listen(3001, () => {
  console.log("Server up and running...");
});
const message = {mesg:"hello"}
Socketio.on("connection", (socket) => {
  socket.emit("position", message);
});*/


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
app.use('/graph/general',require('./router/graphRoute'));
app.use('/user', require('./router/userRoute'));
app.use('/report', require('./router/reportRoute'));


//loadData();
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
    user:'647b3f2dc34527bb4073be43',
    kg:1,
    bin: '647b3e04a4c6674f3e9fca1b' ,
  });
  deposit.save();
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


//NON CANCELLARE
const PORT = 3000;
app.listen(PORT,() =>{
  console.log('Node API server started on port '+PORT);
});

/*mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}); */

