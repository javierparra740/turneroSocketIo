import Server from './server/server';
import router from './router/router';

import socketIO = require('socket.io');
import http = require('http');
import express = require('express');
import path = require('path');
/* Servidor preparado para mandar eventos mediante webSockets */
const expressServer = Server.init(8081);
const server = http.createServer(expressServer.app);
const io = socketIO.listen(server);

expressServer.app.use(router);

expressServer.app.use(express.static(path.join(__dirname, 'frontend')));

io.on('connection',(socket: SocketIO.Socket) => {
    console.log('Turnero Abierto');

    socket.on('data',(data: any) => {
        io.emit('dataFromServer',{ data });
    }); 
}); 

server.listen(8081);
