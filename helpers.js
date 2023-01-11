const moment = require('moment');

function newUser(id, name, room) {
    users.push({id, name, room});
    return {id, name, room};
}
const users = [];
module.exports = {newUser}
module.exports.format = (username, text) => ({username, text, time: moment().format('h:mm a')})