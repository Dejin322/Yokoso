const express = require("express");
const app = express();

app.use(express.static("public"));

app.set("view engine", "ejs");


app.get('/index', (req, res) => {
	res.render('index')
})

app.get('/', (req, res) => {
	res.render('log')
})

server = app.listen("3000", () => console.log("Server is running..."));

const io = require("socket.io")(server);


// Добавляем массив подключенных пользователей

io.on('connection', (socket) => {
console.log('New user connected');

socket.username = `Anonymous`;

// Сохраняем данные пользователя в массив, при подключении к серверу
socket.on('addUser', (data) => {
    var users = [];
socket.username = data.username;
users.push({ id: socket.id, username: data.username });
io.emit('update_userlist', users)
console.log(users)
});

// Ищем получателя по username в массиве подключенных пользователей и отправляем ему сообщение
socket.on('private_message', (data) => {
const recipient = users.find((user) => user.username === data.recipient);
io.to(recipient.id).emit('private_message', { message: data.message, sender: socket.username });
});


    socket.on('new_message', (data) => {
        io.sockets.emit('add_mess', {message : data.message, username : socket.username, className:data.className});
    })

    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
    })
})
