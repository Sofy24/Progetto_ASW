import socket from './socket';

export function getServerData(input: string) {
  return new Promise((resolve, reject) => {
    console.log("try to communicate")
    socket.emit('getServerData', input, (response: any) => {
      resolve(response);
    });
  });
}


export function getRadarData(input: string) {
  return new Promise<number[][]>((resolve, reject) => {
    console.log("try to communicate")
    socket.emit('getRadarData', input, (response: number[][]) => {
      resolve(response);
    });
  });
}