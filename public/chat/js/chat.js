const { id, username, email } = JSON.parse(decodeURIComponent(document.cookie.split("; ").find((row) => row.startsWith('chatr-user')).replace("chatr-user=", "")).match(/({.+})/)[0]);
console.log({ id, username, email });

const socket = io();

socket.emit('connect', { id, username, email });