var http = require('http');
var express = require('express');
var socket = require('socket.io');

var app = express();
var server = http.createServer(app);
server.listen(3000,"192.210.55.193");
var io = socket.listen(server);


//Routing con Express
app.get('/', function (req, res) {
    console.log('Express: Conexión en "/" sirviendo archivo estático...');
    res.sendfile(__dirname + '/index.html');
});

//Sockets events con socket.io
io.sockets.on('connection', function(socket){
  console.log('SocketIO: Usuario Conectado...');

  var sendNotification = function(){
 var time = new Date();
 socket.emit('notification', { mensaje: 'HOLA TE SALUDO DESDE EL SERVIDOR...  :D :D :D'});  
  }

  var sendNotificationInterval = setInterval(sendNotification,5000);  

  socket.on('disconnect', function () {
      console.log('SocketIO: Usuario Desconetado...');
      clearInterval(sendNotificationInterval);
  });
});
