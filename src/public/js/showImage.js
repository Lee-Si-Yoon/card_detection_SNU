const socket = io();

const img = document.images[0];
const bigImg = document.createElement("img");
const btn_container = document.querySelector("#btn_container");

//import img1 from "../imgs/snuman.gif"; // ../../../assets/imgs/1.jpg
import img2 from "../imgs/snuman.webp";
import img3 from "../imgs/ballon.png";
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
  setTimeout(function () {
    //btn_container.style.display = "none";
  }, 4000);
}

socket.on("show_message", getRandomImage);
