import { io, Manager, Socket } from 'socket.io-client';

export const connectToServer = () => {
    //localhost:3001/socket.io/socket.io.js
    const manager = new Manager('localhost:3001/socket.io/socket.io.js');

    const socket = manager.socket('/');

    addListeners( socket );
}

const addListeners = ( socket: Socket ) => {
    const serverStatusLabel = document.querySelector<HTMLSpanElement>('#server-status')!;
    const clientsUl = document.querySelector<HTMLUListElement>('#clients-ul')!;

    socket.on('connect', ()  => {
        console.log('Connected to server');
        serverStatusLabel.innerHTML = 'connected';
    });

    socket.on('disconnect', ()  => {
        console.log('Disconnect to server');
        serverStatusLabel.innerHTML = 'disconnected';
    });

    socket.on('clients-updated', ( clients: string[] ) => {
        console.log('Clients updated', clients);
        let clientsHtml = '';
        clients.forEach( clientId => {
            clientsHtml += `<li>${ clientId }</li>`;
        });

        clientsUl.innerHTML = clientsHtml;
    });
}