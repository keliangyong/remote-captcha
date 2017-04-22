var socket = require('socket.io-client')('http://localhost:7000');

socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
  });