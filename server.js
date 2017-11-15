// server.js
var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
app = express();
app.use(serveStatic(__dirname + "/dist"));
var port = process.env.PORT || 5000;
server = app.listen(port);
var io = require('socket.io')(server);

io.on('connection', function(socket){
    console.log('a user connected', socket);
});
console.log('server started '+ port);