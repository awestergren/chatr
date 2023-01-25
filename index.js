const express = require('express');
const path = require('path');
const {Server} = require('socket.io');
const http = require('http');
const helpers = require('./helpers')
const app = express();
const server = http.createServer(app);
const io = new Server(server, {});
const port = 3000;
const data = {};

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
    socket.on('connect', ({name, room}) => {
        const user = newUser(socket.id, name, room);
        socket.join(user.room)

        socket.broadcast
            .to(user.room)
            .emit('joined', user.name)
    });
});
app.get('rooms/:id', (res, req) => res.write(''));

server.listen(3000);