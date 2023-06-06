const { Server } = require('socket.io');
const Radar = require("./controller/RadarController")
const Column = require("./controller/ColumnController")
const Pie = require("./controller/PieController")

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
    console.log("receive 1");
    
    socket.on('getServerData', (data, callback) => {
      console.log("receive 2");
      // Perform the necessary actions to retrieve the server data
      // Send the response back to the client
      const serverData = "rumao " + data; // Retrieve the server data
      callback(serverData);
    });

    socket.on('getRadarData', (data, callback) => {
        console.log("receive 3");
        // Perform the necessary actions to retrieve the server data
        // Send the response back to the client
        //const serverData = Radar.handle2Months()
        
        /*
        Radar.handle2Months().then((res)=>{
            serverData = toRaw("inside then"+res.data)
            callback(serverData);
        })*/
        /*Radar.handle2Months((req,res)=>{
            console.log("banana"+res)
            serverData = res.data
        });*/ // Retrieve the server data
        //console.log("outside then"+serverData)
        //console.log("outside then2"/*+Radar.handle2Months()*/)



        /*
        var x = Radar.handle2Months().then((res)=>{
            //y = 
            console.log(res.data)
        })*/
        /*Radar.radarData((res)=>{
            console.log("IN THEN : "+ res)
            
        })*/
        //console.log("X: "+x)
        Radar.radarData2().then((res)=>{
            console.log("X: "+res)
            callback( res);
        })
        //console.log("X: "+x)
    });

    socket.on('getColumnData', (data, callback) => {
        console.log("receive 3");

        Column.generalData().then((res)=>{
            console.log("X: "+res)
            callback( res);
        })
    });

    socket.on('getPieData', (data, callback) => {
        console.log("receive 3");
        Pie.generalData().then((res)=>{
            console.log("X: "+res)
            callback( res);
        })
    });

  });
}

module.exports = { handleSocketConnections };