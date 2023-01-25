const express = require('express');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');
const helpers = require('./helpers')
const app = express();
const { v4: uuidv4 } = require('uuid');
const server = http.createServer(app);
const io = socketio(server);
const port = 3000;
const data = {};

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.post('/login', (req, res) => {
    const { email, username } = req.body;

    if (email && username) {
        const id = uuidv4();
        helpers.newUser(id, username, email);
        res.cookie('chatr-user', { id, username, email }).redirect('/chat/');
    } else {
        res.status(422).json({ error: 'Invalid email and/or username.' });
    }
});

io.on('connection', socket => {
    socket.on('connect', ({ id, username, email, room }) => {
        const user = newUser(socket.id, name, room);
        socket.join(user.room)

        socket.broadcast
            .to(user.room)
            .emit('joined', user.name)
    });
});
app.get('rooms/:id', (res, req) => res.write(''));

server.listen(3000);