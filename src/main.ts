import { connectToServer } from './socket-client';
import './style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h2>Websocket - Client</h2>

    <input id="jwt-token" placeholder="Json Web Token" />
    <button id="btn-connect">Connect</button>
    <br>

    <span id="server-status">offline</span>

    <ul id="clients-ul"></ul>

    <form id="form-message">
      <input placeholder="message" id="message-input" />
    </form>

    <h3>Messages</h3>

    <ul id="messages-ul"></ul>
  </div>
`;

const jwtToken = document.querySelector<HTMLInputElement>('#jwt-token')!;
const btnConnect = document.querySelector<HTMLButtonElement>('#btn-connect')!;

btnConnect.addEventListener('click', () => {
    const token = jwtToken.value;
    if (token.length <= 0) {
        alert('JWT Token is empty');
        return;
    }

    console.log('Connecting to server with JWT Token', token);
    connectToServer(token);
});

//connectToServer();