const socket = io();

const img = document.images[0];
const bigImg = document.createElement("img");
const btn_container = document.querySelector("#btn_container");

import img1 from "../imgs/snuman.webp";
import img2 from "../imgs/printpic.png";
import img3 from "../imgs/snu_logo.png";
import img4 from "../imgs/top_dude.png";
//import img3 from "../imgs/3.jpg";

bigImg.onload = function () {
  img.src = this.src;
  img.className = "noBlur";
};
setTimeout(function () {
  bigImg.src = "/assets/imgs/snuman.webp";
}, 50);

btn_container.style.display = "none";

function getRandomImage() {
  btn_container.style.display = "flex";
  setTimeout(function () {
    btn_container.classList.add("hide");
  }, 3000);
  location.reload();
}

socket.on("show_message", getRandomImage);
