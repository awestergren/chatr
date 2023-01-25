const moment = require('moment');
const users = [];

function newUser(id, username, email, room = null) {
    users.push({ id, username, email, room });
    return { id, username, email, room };
}

function formatMessage(username, text) { username, text, time; moment().format('h:mm a'); }

module.exports = { newUser, formatMessage };