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

const users = [];

io.on('connection', (socket) => {
  const userId = socket.id;

  const user = { id: userId };
  users.push(user);

  socket.emit('userList', users, userId);

  socket.on('disconnect', () => {
    const userIndex = users.findIndex((user) => user.id === userId);
    if (userIndex !== -1) {
      users.splice(userIndex, 1);
      io.emit('userList', users);
    }
  });

  socket.on('message', (userId, message) => {
    if (!userId) {
      userId = '';
    }
    if (!message) {
      message = '';
    }
    const user = users.find((user) => user.id === userId);
    if (user) {
      io.to(user.id).emit('message', message);
    } else {
      io.emit('message', message);
    }
  });
});



