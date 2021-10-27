const socket = io();

const btn_container = document.querySelector("#btn_container");
const btn = btn_container.querySelector("button");
const img = document.images[0];
const bigImg = document.createElement("img");

//import img1 from "../imgs/snuman.gif"; // ../../../assets/imgs/1.jpg
import img2 from "../imgs/snuman.webp";
import img3 from "../imgs/ballon.png";
//import img3 from "../imgs/3.jpg";

function getRandomImage() {
  bigImg.onload = function () {
    img.src = this.src;
    img.className = "noBlur";
  };
  setTimeout(function () {
    bigImg.src = "/assets/imgs/snuman.webp";
  }, 50);
}

socket.on("show_message", getRandomImage);
