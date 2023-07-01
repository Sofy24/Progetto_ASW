const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
const fs = require('fs');
const path = require('path');
const connectDB = require('./config/dbConn');
const populator = require('./prepopulation/prepopulate');
const http = require('http');
const { handleSocketConnections } = require('./socketController');
app.use(cors());


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
app.use('/classification', require('./router/classificationRoute'));
app.use('/municipality', require('./router/municipalityRoute'));
app.use('/register', require('./router/registerRoute'));
app.use('/login', require('./router/loginRoute'));
app.use('/user', require('./router/userRoute'));
app.use('/report', require('./router/reportRoute'));
app.use('/badge', require('./router/badgeRoute'));
app.use('/typology', require('./router/typologyRoute'));
app.use('/deposit', require('./router/depositRoute'));


module.exports = app;