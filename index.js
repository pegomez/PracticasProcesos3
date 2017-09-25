// Creación del servidor cogida de node-express.js
// ******************************************************
var fs=require("fs");
//var config=JSON.parse(fs.readFileSync("config.json"));
//var host=config.host;
//var port=config.port;
var exp=require("express");
var app=exp(); //el tutorial indicaba exp.createServer()

var http = require('http').Server(app);
var io = require('socket.io').listen(http);

//app.use(app.router);
//app.use(exp.static(__dirname + "/public"));
app.use(exp.static(__dirname + "/"));

app.get("/",function(request,response){
	//response.send("hola");
  var contenido =fs.readFileSync("./index.html");
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.send(contenido);
});
// ******************************************************

/*
var http = require('http'),
    fs = require('fs'),
    // NEVER use a Sync function except at start-up!
    index = fs.readFileSync(__dirname + '/index.html');

// Send index.html to all requests
var app = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
});
*/

// Send current time to all connected clients
function sendTime() {
    io.emit('tiempo', { tiempo: new Date().toJSON() });
}

// Send current time every 10 secs
setInterval(sendTime, 5000);

// Emit welcome message on connection
io.on('connection', function(socket) {
    // Use socket to communicate with this particular client only, sending it it's own id
    socket.emit('bienvenido', { message: 'Bienvenido!', id: socket.id });

    socket.on('Soy un cliente.', console.log);
});

http.listen(2500);
