const socket = require('socket.io');
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const indexPath = path.join(__dirname, 'index.html');
    const readStream = fs.createReadStream(indexPath);
    readStream.pipe(res);
});

const io = socket(server);
const usersMap = {};
let countUser = 0;

io.on('connection', (client) => {
    console.log('connection', client);
    usersMap[client.id] = {
        id: client.id
    };
    countUser++


    client.send(`User on Page ${countUser}`);


    client.broadcast.emit('NEW_CONN_EVENT', {
        msg: `The new client connected, User on Page ${countUser}`
    });

    client.on('client-msg', (data) => {
        console.log(data);
        const payload = {
            message: data.message.split('').reverse().join(''),
            id: client.id.slice(0, 3),


        };

        client.broadcast.emit('server-msg', payload);
        client.emit('server-msg', payload);

    });
    client.on('disconnect', () => {
        console.log('Disconnect');
        countUser--
        client.broadcast.emit('DISCONNECT', {
            msg: `One client Disconnect, User on Page ${countUser}`
        });
        delete usersMap[client.id];

    })



    console.log(usersMap);
});

server.listen(5555);