import "../scss/styles.scss";

const socket = io();

const form = document.querySelector("form");

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  socket.emit("new_message", input.value);
  input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);
