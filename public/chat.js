$(function () {
  var socket = io.connect("http://localhost:3000");

window.onload = function() {
  document.getElementById('modal').style.display = 'flex';
};

$(document).on('submit', '#usernameForm', function(event) {
  event.preventDefault(); 
  var username = $('#usernameInput').val();
  socket.emit('addUser', { username: username });
  console.log(username)
  $('#modal').modal('hide');
});


})  
