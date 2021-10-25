const socket = io();
const btn_container = document.querySelector("#btn_container");
const btn = btn_container.querySelector("button");

import img1 from "../imgs/1.jpg"; // ../../../assets/imgs/1.jpg
import img2 from "../imgs/2.jpg";
import img3 from "../imgs/3.jpg";

const image_array = [img1, img2, img3];

function getRandomImage() {
  const random_index = Math.floor(Math.random() * image_array.length);
  const selected_image = image_array[random_index];
  document.getElementById("img_shower").src = selected_image;
  //document.getElementById("img_shower").style.display = "none";
}

btn.addEventListener("click", () => {
  getRandomImage();
});

socket.on("showBtnHit", getRandomImage);
