const socket = io();
const room = document.querySelector("#room");
const btn_container = document.querySelector("#btn_container");
const btn = btn_container.querySelector("button");

import img1 from "../imgs/1.jpg"; // ../../../assets/imgs/1.jpg
import img2 from "../imgs/1.jpg";
import img3 from "../imgs/1.jpg";

const image_array = [img1, img2, img3];

function getRandomImage() {
  const random_index = Math.floor(Math.random() * image_array.length);
  const selected_image = image_array[random_index];
  //console.log(selected_image);
  document.getElementById("img_shower").src = selected_image;
  //document.getElementById("img_shower").style.display = "none";
}

function addMessage(message) {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
}

btn.addEventListener("click", () => {
  getRandomImage();
});

socket.on("show_message", addMessage);
socket.on("hitted", (h) => {
  addMessage(h);
});
socket.on("showBtnHit", getRandomImage);
