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
    const formMessage = document.querySelector<HTMLFormElement>('#form-message')!;
    const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;

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

    formMessage.addEventListener('submit', ( event ) => {
        event.preventDefault();

        if(!messageInput.value) {
            console.log('Message is empty');
            return;
        }

        const message = messageInput.value;
        const payload = {
            id: socket.id,
            message
        }

        console.log('Sending message', payload);

        socket.emit('message-from-client', payload, ( id: string ) => {
            console.log('Message delivered', id);
        });

        messageInput.value = '';
    });
}