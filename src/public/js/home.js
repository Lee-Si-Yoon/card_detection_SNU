const socket = io();

const nameContainer = document.querySelector("#nameContainer");

function handleRoomSubmit(event) {
  //event.preventDefault();
  const input = nameContainer.querySelector("#nameInput");
  socket.emit("new_message", input.value);
  //input.value = "";
}

nameContainer.addEventListener("submit", handleRoomSubmit);
