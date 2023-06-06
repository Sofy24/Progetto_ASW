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




  export function getColumnData(input: string) {
    getColumnDataPeriodically(input)
    return new Promise<number[][]>((resolve, reject) => {
      
      console.log("column first")
      socket.emit('getColumnData', input, (response: number[][]) => {
        resolve(response);
      });
    
    });
  }
  
  export function getColumnDataPeriodically(input: string) {
    return new Promise<number[][]>((resolve, reject) => {
      setInterval(() => {
        console.log("column periodic")
        socket.emit('getColumnData', input, (response: number[][]) => {
          resolve(response);
        })
      }, 60*1000);
    });
  }



  export function getPieData(input: string) {
    getPieDataPeriodically(input)
    return new Promise<number[]>((resolve, reject) => {
      
      console.log("pie first")
      socket.emit('getPieData', input, (response: number[]) => {
        resolve(response);
      });
    
    });
  }
  
  export function getPieDataPeriodically(input: string) {
    return new Promise<number[]>((resolve, reject) => {
      setInterval(() => {
        console.log("pie periodic")
        socket.emit('getPieData', input, (response: number[]) => {
          resolve(response);
        })
      }, 60*1000);
    });
  }

