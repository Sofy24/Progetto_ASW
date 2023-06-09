import socket from './socket';

export function getServerData(input: string) {
  return new Promise<string>((resolve, reject) => {
    console.log("try to communicate")
    console.log('Connected with transport:', socket.io.engine.transport.name);
    socket.emit('getServerData', input, (response: string) => {
      resolve(response);
    });
  });
}

export function getRadarData(input: string) {
  //getRadarDataPeriodically(input)
  return new Promise<number[][]>((resolve, reject) => {
    console.log("try to communicate3")
    socket.emit('getRadarData', input, (response: number[][]) => {
      resolve(response);
    });
  
  });
}

export function getRadarDataPeriodically(input: string) {
  return new Promise<number[][]>((resolve, reject) => {
    setInterval(() => {
      console.log("try to communicate2")
      socket.emit('getRadarData', input, (response: number[][]) => {
        resolve(response);
      })
    }, 60*1000);
    
  });
}




export function getColumnData(input: string) {
  //getColumnDataPeriodically(input)
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
  //getPieDataPeriodically(input)
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


export function getImpiledData(input: string) {
  //getImpiledDataPeriodically(input)
  return new Promise<number[][][]>((resolve, reject) => {
    
    console.log("impiled first")
    socket.emit('getImpiledData', input, (response: number[][][]) => {
      resolve(response);
    });
  
  });
}
  
export function getImpiledDataPeriodically(input: string) {
  return new Promise<number[][][]>((resolve, reject) => {
    setInterval(() => {
      console.log("impiled periodic")
      socket.emit('getImpiledData', input, (response: number[][][]) => {
        resolve(response);
      })
    }, 60*1000);
  });
}


export function getLineData(input: string) {
  //getLineDataPeriodically(input)
  return new Promise<number[][][]>((resolve, reject) => {
    
    console.log("line first")
    socket.emit('getLineData', input, (response: number[][][]) => {
      resolve(response);
    });
  
  });
}
  
export function getLineDataPeriodically(input: string) {
  return new Promise<number[][][]>((resolve, reject) => {
    setInterval(() => {
      console.log("line periodic")
      socket.emit('getLineData', input, (response: number[][][]) => {
        resolve(response);
      })
    }, 60*1000);
  });
}

export function getNotifications(input: string) {
  return new Promise<number[]>((resolve, reject) => {
    console.log("this is emit not")
    setInterval(() => {
      socket.emit('getNotification', input, (response: number[]) => {
        resolve(response);

      })
    }, 40*10);
  }); 
}