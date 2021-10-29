const socket = io();

const unload = document.querySelector("#unload");
const img_shower = document.querySelector("#img_shower");
const btn_container = document.querySelector("#btn_container");

import img1 from "../imgs/snuman.webp";
import img2 from "../imgs/printpic.png";
import img3 from "../imgs/snu_logo.png";
import img4 from "../imgs/top_dude.png";
//import img3 from "../imgs/3.jpg";

img_shower.style.display = "none";
unload.style.display = "block";

img_shower.addEventListener("load", () => {
  unload.style.display = "none";
  img_shower.style.display = "block";
});

btn_container.style.display = "none";
function getRandomImage() {
  //unload.style.display = "none";
  btn_container.style.display = "flex";
  setTimeout(function () {
    btn_container.classList.add("hide");
  }, 5000);
  setTimeout(() => {
    location.reload();
  }, 1000);
}

socket.on("show_message", getRandomImage);
