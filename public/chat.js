$(function () {
  var socket = io.connect("http://localhost:3000");
  const userList = $('#userList');
  const messageList = $('#messageList');
  const messageForm = $('#messageForm');
  const messageInput = $('#messageInput');
  
  socket.on('userList', (users, userId) => {
    userList.empty();
    for (let user of users) {
      const item = $('<li>').addClass('list-group-item').text(user.id).data('userid', user.id);
      if (user.id === userId) {
        item.addClass('active');
      }
      userList.append(item);
    }
  });
  
  userList.on('click', 'li', function() {
    const userId = $(this).data('userid');
    const message = prompt('Введите сообщение:');
    if (message) {
      socket.emit('message', userId, message);
    }
  });
  
  messageForm.submit((event) => {
    event.preventDefault();
    const message = messageInput.val();
    if (message) {
      socket.emit('message', '', message);
      messageInput.val('');
    }
  });
  
  socket.on('message', (message) => {
    messageList.append($('<li>').addClass('list-group-item').text(message));
  })
})