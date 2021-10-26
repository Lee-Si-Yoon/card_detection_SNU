const socket = io();

const btn_container = document.querySelector("#btn_container");
const btn = btn_container.querySelector("button");
const img = document.images[0];
const bigImg = document.createElement("img");

//import img1 from "../imgs/snuman.gif"; // ../../../assets/imgs/1.jpg
//import img2 from "../imgs/snuman.webp";
import img3 from "../imgs/ballon.png";
//import img3 from "../imgs/3.jpg";

//const image_array = [img1, img2, img3];

function getRandomImage() {
  //const random_index = Math.floor(Math.random() * image_array.length);
  //const selected_image = image_array[random_index];
  //img.src = "/assets/imgs/snuman.gif";
  //document.getElementById("img_shower").style.display = "none";
  bigImg.onload = function () {
    img.src = this.src;
    img.className = "noBlur";
  };
  setTimeout(function () {
    bigImg.src = "/assets/imgs/snuman.webp";
  }, 50);
}

btn.addEventListener("click", () => {
  getRandomImage();
});

socket.on("showBtnHit", getRandomImage);
