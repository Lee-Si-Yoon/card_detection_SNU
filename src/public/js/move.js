var myElement = document.querySelector("body");
const xPosit = document.querySelector("#xPosition");
const yPosit = document.querySelector("#yPosition");

// create a simple instance
// by default, it only adds horizontal recognizers
var mc = new Hammer(myElement);
var counter = false;
function hit() {
  counter = true;
  socket.emit("hit");
}

// listen to events...
mc.on("panleft panright tap press", function (ev) {
  //console.log(ev.center); postion of tab
  //console.log(ev.center.x);
  xPosit.innerHTML = ev.center.x;
  yPosit.innerHTML = ev.center.y;
  if (
    ev.center.x > 410 &&
    ev.center.x < 460 &&
    ev.center.y < 110 &&
    ev.center.y > 80
  ) {
    if (counter === false) {
      hit();
    } else {
      console.log("too much");
      return;
    }
  }
});
