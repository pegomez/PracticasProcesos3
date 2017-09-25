var socket = io();

// Cuando el servidor hace el emit welcome se viene aqui
socket.on('bienvenido', function(data) {
    //addMessage(data.message);
    addMessage(data.message);

    // Respond with a message including this clients' id sent from the server
    socket.emit('Soy un nuevo cliente', {data: 'foo!', id: data.id});
});

// Cuando el servidor hace el emit time se viene aqui
socket.on('tiempo', function(data) {
    addMessage(data.tiempo);
});
socket.on('error', console.error.bind(console));
socket.on('message', console.log.bind(console));

function addMessage(message) {
    var text = document.createTextNode(message),
        el = document.createElement('li'),
        messages = document.getElementById('messages');

    el.appendChild(text);
    messages.appendChild(el);
}
