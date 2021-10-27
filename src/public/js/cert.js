const socket = io();
const certContainer = document.querySelector("#certContainer");

// have to do express way
function addMessage(message) {
  const ul = certContainer.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
}

socket.on("show_message", (msg) => {
  addMessage(msg);
});
