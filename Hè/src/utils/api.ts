import socket from './socket';
import { verifyToken } from './tokenUtils';
import axios from 'axios';

export function getServerData(input: string) {
  return new Promise<string>((resolve, reject) => {
    console.log('Connected with transport:', socket.io.engine.transport.name);
    socket.emit('getServerData', input, (response: string) => {
      resolve(response);
    });
  });
}

export function getRadarData(input: string) {
  //getRadarDataPeriodically(input)
  return new Promise<number[][]>((resolve, reject) => {
    socket.emit('getRadarData', input, (response: number[][]) => {
      resolve(response);
    });
  
  });
}

export function getRadarDataPeriodically(input: string) {
  return new Promise<number[][]>((resolve, reject) => {
    setInterval(() => {
      socket.emit('getRadarData', input, (response: number[][]) => {
        resolve(response);
      })
    }, 60*1000);
    
  });
}




export function getColumnData(input: string) {
  //getColumnDataPeriodically(input)
  return new Promise<number[][]>((resolve, reject) => {
    
    socket.emit('getColumnData', input, (response: number[][]) => {
      resolve(response);
    });
  
  });
}

export function getColumnDataPeriodically(input: string) {
  return new Promise<number[][]>((resolve, reject) => {
    setInterval(() => {
      socket.emit('getColumnData', input, (response: number[][]) => {
        resolve(response);
      })
    }, 60*1000);
  });
}



export function getPieData(input: string) {
  //getPieDataPeriodically(input)
  return new Promise<number[]>((resolve, reject) => {
    
    socket.emit('getPieData', input, (response: number[]) => {
      resolve(response);
    });
  
  });
}
  
export function getPieDataPeriodically(input: string) {
  return new Promise<number[]>((resolve, reject) => {
    setInterval(() => {
      socket.emit('getPieData', input, (response: number[]) => {
        resolve(response);
      })
    }, 60*1000);
  });
}


export function getImpiledData(input: string) {
  //getImpiledDataPeriodically(input)
  return new Promise<number[][][]>((resolve, reject) => {
    
    socket.emit('getImpiledData', input, (response: number[][][]) => {
      resolve(response);
    });
  
  });
}
  
export function getImpiledDataPeriodically(input: string) {
  return new Promise<number[][][]>((resolve, reject) => {
    setInterval(() => {
      socket.emit('getImpiledData', input, (response: number[][][]) => {
        resolve(response);
      })
    }, 60*1000);
  });
}


export function getLineData(input: string) {
  //getLineDataPeriodically(input)
  return new Promise<number[][][]>((resolve, reject) => {
    
    socket.emit('getLineData', input, (response: number[][][]) => {
      resolve(response);
    });
  
  });
}
  
export function getLineDataPeriodically(input: string) {
  return new Promise<number[][][]>((resolve, reject) => {
    setInterval(() => {
      socket.emit('getLineData', input, (response: number[][][]) => {
        resolve(response);
      })
    }, 60*1000);
  });
}

export function getNotifications(input: string) {
  return new Promise<number[]>((resolve, reject) => {
    verifyToken().then(res => {
      setInterval(() => {
        socket.emit('getNotification', res, (response: number[]) => {
          resolve(response);
  
        })
      }, 60*100);

    }).catch((error) => {
      console.error(error);
      throw error;
    });
  }); 
}

export function sendEmail() {
  return verifyToken()
    .then((tokenValue) => {
      return axios.post("http://localhost:3000/binState", {
        email: tokenValue,
      })
      .then((response) => {
        return response.data;
      });
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}
