const express = require('express');
const path = require('path');
const uuid = require('uuid')
const {Server} = require('socket.io');
const http = require('http');
const helpers = require('./helpers')
const app = express();
const server = http.createServer(app);
const io = new Server(server, {});
const port = 3000;
const data = {};

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
    socket.once('connect', (room) => {
        socket.join(room);

        io.to(user.room).emit('joined', user.name);
    });
});
app.post('/login', (req, res) => {
    const {username, password} = req.body;
    res.cookie('chatr_user', username)
    .redirect(true?'/chat':'/login'); // TODO: handle incorrect password
});

server.listen(3000);