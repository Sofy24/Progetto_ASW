const { Server } = require('socket.io');
const Radar = require("./controller/RadarController");
const Column = require("./controller/ColumnController");
const Pie = require("./controller/PieController");
const Impiled = require("./controller/ImpiledController");
const Line = require("./controller/LineController");
const { handleNewNote } = require('./Controller/NotificationController');
const Notification = require('./model/Notification');

// Define a function to handle the socket connections
function handleSocketConnections(server) {
  const io = new Server(server, {
    path: '/socket.io/',
    cors: {
      origin: 'http://localhost:5173', // Replace with the actual client origin
      methods: ['GET', 'POST'], // Specify the allowed HTTP methods
    },
  });

  io.on('connection', (socket) => {
    
    socket.on('getServerData', (data, callback) => {
      
      const serverData = "rumao " + data; // Retrieve the server data
      callback(serverData);
    });

    socket.on('getRadarData', (data, callback) => {
        
        if(data=="general"){
            Radar.generalData().then((res)=>{
                
                callback( res);
            })
        }else{
            Radar.userData(data).then((res)=>{
                
                callback( res);
            })
        }
        
    });

    socket.on('getColumnData', (data, callback) => {
        
        if(data=="general"){
            Column.generalData().then((res)=>{
           
                callback( res);
            })
        }else{
            Column.userData(data).then((res)=>{
                
                callback( res);
            })
        }
    });

    socket.on('getPieData', (data, callback) => {
        
        if(data=="general"){
            Pie.generalData().then((res)=>{
                
                callback( res);
            })
        }else{
            Pie.userData(data).then((res)=>{
                callback( res);
            })
        }
    });


    socket.on('getImpiledData', (data, callback) => {
       
        if(data=="general"){
            Impiled.generalData().then((res)=>{
                callback( res);
            })
        }else{
            Impiled.userData(data).then((res)=>{
                callback( res);
            })
        }
    });

    socket.on('getLineData', (data, callback) => {
        if(data=="general"){
            Line.generalData().then((res)=>{
                callback( res);
            })
        }else{
            Line.userData(data).then((res)=>{
                callback( res);
            })
        }
    });


    socket.on('getNotification', (email, callback) => {
        handleNewNote(email).then((res)=>{
            callback(res);
        });

    });


    });


  
}

module.exports = { handleSocketConnections };