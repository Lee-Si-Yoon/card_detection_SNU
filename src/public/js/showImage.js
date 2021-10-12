const socket = io();

const room = document.querySelector("#room");
const touchArea = document.querySelector("body");
image_array = ["1.jpg", "2.jpg", "3.jpg"];

function getRandomImage() {
  const random_index = Math.floor(Math.random() * image_array.length);
  const selected_image = image_array[random_index];
  document.getElementById("img_shower").src = `./public/imgs/${selected_image}`;
}

function addMessage(message) {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
}

socket.on("show_message", addMessage);
socket.on("hitted", (h) => {
  addMessage(h);
});
