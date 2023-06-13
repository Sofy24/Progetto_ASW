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
  return new Promise<number[][]>((resolve, reject) => {
    socket.emit('getRadarData', input, (response: number[][]) => {
      resolve(response);
    });
  
  });
}





export function getColumnData(input: string) {
  return new Promise<number[][]>((resolve, reject) => {
    
    socket.emit('getColumnData', input, (response: number[][]) => {
      resolve(response);
    });
  
  });
}




export function getPieData(input: string) {
  return new Promise<number[]>((resolve, reject) => {
    
    socket.emit('getPieData', input, (response: number[]) => {
      resolve(response);
    });
  
  });
}
  
export function getImpiledData(input: string) {
  return new Promise<number[][][]>((resolve, reject) => {
    
    socket.emit('getImpiledData', input, (response: number[][][]) => {
      resolve(response);
    });
  
  });
}
  

export function getLineData(input: string) {
  return new Promise<number[][][]>((resolve, reject) => {
    
    socket.emit('getLineData', input, (response: number[][][]) => {
      resolve(response);
    });
  
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

export function readNotification(input: string){
  return new Promise<number[][][]>((resolve, reject) => {
    socket.emit('readNotification', input, (response: number[][][]) => {
      resolve(response);
    });
  
  });
}

export function getNotReadNotification(input: string){
  return new Promise<number>((resolve, reject) => {
    verifyToken().then(res => {
      setInterval(() => {
        socket.emit('getNotReadNotification', res, (response: number) => {
          resolve(response)
        })
      }, 60*100)

    }).catch((error) => {
      console.error(error)
      throw error
    })
  })

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
