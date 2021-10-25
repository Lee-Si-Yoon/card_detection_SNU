const socket = io();
const room = document.querySelector("#room");

function addMessage(message) {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
}

socket.on("show_message", addMessage);
