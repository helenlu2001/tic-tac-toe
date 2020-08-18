const express = require('express')
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 4001;

let players = 0;

io.on("connection", (socket) => {
    console.log('user has been connected');

    socket.emit('join', players % 2 == 0 ? 'X' : 'O');
    players += 1;

    socket.on('turn', (data) => {
        socket.broadcast.emit('update', data);
    });

    socket.on('end', (data) => {
        socket.broadcast.emit('finished', data);
    });

    socket.on('reset pressed', () => {
        socket.broadcast.emit('reset');
    })

    socket.on("disconnect", () => {
        console.log('a user has been disconnected');
    });
})

server.listen(port, () => {
    console.log(`listening on port ${port}`);
});


