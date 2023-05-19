$(function () {
    var socket = io.connect("http://localhost:3000");
    var send_username = $("#send_username");

    send_username.click(() => {
        socket.emit('login', { username: 'Alex' })
        window.location.href = '/index'
    })
})
