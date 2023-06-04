import socket from './socket';

export function getServerData(input: string) {
  return new Promise((resolve, reject) => {
    console.log("try to communicate")
    socket.emit('getServerData', input, (response: any) => {
      resolve(response);
    });
  });
}