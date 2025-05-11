import { io, Manager, Socket } from 'socket.io-client';

export const connectToServer = () => {
    //localhost:3001/socket.io/socket.io.js
    const manager = new Manager('localhost:3001/socket.io/socket.io.js');

    const socket = manager.socket('/');

    addListeners( socket );
}

const addListeners = ( socket: Socket ) => {
    const serverStatusLabel = document.querySelector<HTMLSpanElement>('#server-status')!;

    socket.on('connect', ()  => {
        console.log('Connected to server');
        serverStatusLabel.innerHTML = 'connected';
    });

    socket.on('disconnect', ()  => {
        console.log('Disconnect to server');
        serverStatusLabel.innerHTML = 'disconnected';
    });
}