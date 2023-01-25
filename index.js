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
    socket.on('connect', ({name, room}) => {
        const user = newUser(socket.id, name, room);
        socket.join(user.room)

        socket.broadcast
            .to(user.room)
            .emit('joined', user.name)
    });
});
app.post('/login', (req, res) => {
    const {username, email} = req.body;
    console.log(username+email);
    res.cookie('chatr_user', {username, email})
    .redirect('/chat'); // TODO: handle incorrect password
});

server.listen(3000);