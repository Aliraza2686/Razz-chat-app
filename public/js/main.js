const socket = io();
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomname = document.getElementById('room-name');
const userList = document.getElementById('users');
const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});
socket.emit('joinRoom', {username, room});
socket.on('roomUsers', ({room, users}) => {
    outputRoomName(room);
    outputRoomUsers(users);
});
socket.on('message', message => {

    outputMessage(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
});
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = e.target.elements.msg.value;

    socket.emit('chatMessage', msg);

    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
})

function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `
        <p class="meta">${message.username} <span>${message.time}</span></p>
        <p class="text">
           ${message.text}
        </p>
    `;
    document.querySelector('.chat-messages').appendChild(div);
}
function outputRoomName (room) {
    roomname.innerText = room;
}

function outputRoomUsers(users) {
    userList.innerHTML = '';
    users.forEach((user) => {
      const li = document.createElement('li');
      li.innerText = user.username;
      userList.appendChild(li);
      
    });
    users.scrollTop = users.scrollHeight;
  }
  const hide = document.querySelector('.hide');
  const show = document.querySelector('.show');

  show.addEventListener('click', (e) => {
     e.preventDefault();
     hide.classList.add('dev');
     setTimeout(() => {
      hide.classList.remove('dev');
     }, 3000);
  });