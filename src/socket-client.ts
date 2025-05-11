import { io, Manager } from 'socket.io-client';

export const connectToServer = () => {
    //localhost:3001/socket.io/socket.io.js
    const manager = new Manager('localhost:3001/socket.io/socket.io.js');

    const socket = manager.socket('/');
}