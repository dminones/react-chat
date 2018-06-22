import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:5000');
socket.on('connect', () => console.log("CONNECTED"));

function sendMessage(username, message) {
    socket.emit('chat', { username, message } );
}

function subscribeMessages(callback) {
    socket.on('chat',callback);
}

export { sendMessage, subscribeMessages };