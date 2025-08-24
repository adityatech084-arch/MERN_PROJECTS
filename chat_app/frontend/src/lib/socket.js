import {io} from 'socket.io-client';

let socket=null;


export const connectSocket = (userId) => {
    socket = io(process.env.VITE_API_BASE_URL,{
        query : {userId}
    });

    return socket;
}


export const getSocket = () => socket;


export const disconnectSocket = () => {
    if(socket){
        socket.disconnect();
        socket =  null;
    }
}
