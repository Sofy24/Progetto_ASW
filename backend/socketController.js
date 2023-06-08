const { Server } = require('socket.io');
const Radar = require("./controller/RadarController")
const Column = require("./controller/ColumnController")
const Pie = require("./controller/PieController")
const Impiled = require("./controller/ImpiledController")
const Line = require("./controller/LineController")

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
    //console.log("receive 1");
    
    socket.on('getServerData', (data, callback) => {
      //console.log("receive 2");
      // Perform the necessary actions to retrieve the server data
      // Send the response back to the client
      const serverData = "rumao " + data; // Retrieve the server data
      callback(serverData);
    });

    socket.on('getRadarData', (data, callback) => {
        //console.log("receive 3");
        if(data=="general"){
            Radar.generalData().then((res)=>{
                //console.log("X: "+res)
                callback( res);
            })
        }else{
            Radar.userData(data).then((res)=>{
                //console.log("X: "+res)
                callback( res);
            })
        }
        
        //console.log("X: "+x)
    });

    socket.on('getColumnData', (data, callback) => {
        //console.log("receive 3");
        if(data=="general"){
            Column.generalData().then((res)=>{
            //console.log("X: "+res)
                callback( res);
            })
        }else{
            Column.userData(data).then((res)=>{
                //console.log("X: "+res)
                callback( res);
            })
        }
    });

    socket.on('getPieData', (data, callback) => {
        //console.log("receive 3");
        if(data=="general"){
            Pie.generalData().then((res)=>{
                //console.log("X: "+res)
                callback( res);
            })
        }else{
            Pie.userData(data).then((res)=>{
                //console.log("X: "+res)
                callback( res);
            })
        }
    });


    socket.on('getImpiledData', (data, callback) => {
        //console.log("receive 3");
        if(data=="general"){
            Impiled.generalData().then((res)=>{
                //console.log("X: "+res)
                callback( res);
            })
        }else{
            Impiled.userData(data).then((res)=>{
                //console.log("X: "+res)
                callback( res);
            })
        }
    });

    socket.on('getLineData', (data, callback) => {
        //console.log("receive 3");
        if(data=="general"){
            Line.generalData().then((res)=>{
                //console.log("X: "+res)
                callback( res);
            })
        }else{
            Line.userData(data).then((res)=>{
                //console.log("X: "+res)
                callback( res);
            })
        }
    });

  });
}

module.exports = { handleSocketConnections };