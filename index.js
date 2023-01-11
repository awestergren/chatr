const express = require('express');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');
const helpers = require('helpers')
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const port = 3000;
const data = {};
app.listen(3000, () => console.log('running'));

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
    socket.on('connect', ({name, room}) => {
        const user = newUser(socket.id, name, room);
        socket.join(user.room)
    });
});
app.get('rooms/:id', (res, req) => undefined);