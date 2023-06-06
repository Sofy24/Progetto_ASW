import socket from './socket';

export function getServerData(input: string) {
  return new Promise((resolve, reject) => {
    console.log("try to communicate")
    console.log('Connected with transport:', socket.io.engine.transport.name);
    socket.emit('getServerData', input, (response: any) => {
      resolve(response);
    });
  });
}

export function getRadarDataFirst(input: string) {
  return new Promise<number[][]>((resolve, reject) => {
    
    console.log("try to communicate3")
    socket.emit('getRadarData', input, (response: number[][]) => {
      resolve(response);
    });
  
  });
}

export function getRadarData(input: string) {
  return new Promise<number[][]>((resolve, reject) => {
    setInterval(() => {
      console.log("try to communicate2")
      socket.emit('getRadarData', input, (response: number[][]) => {
        resolve(response);
      })
    }, 60*1000);
    /*
    socket.emit('getRadarData', input, (response: number[][]) => {
      resolve(response);
    });*/
  
  });
}