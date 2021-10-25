const socket = io();
const form = document.querySelector("form");
const showBtn = document.querySelector("#showBtn");

function handleRoomSubmit(event) {
  const input = form.querySelector("input");
  socket.emit("new_message", input.value);
  input.value = "";
}

function handleShowBtn(event) {
  event.preventDefault();
  socket.emit("show_btn");
}

form.addEventListener("submit", handleRoomSubmit);
showBtn.addEventListener("click", handleShowBtn);
