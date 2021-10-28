import { Renderer } from "@pixi/core";
import { BatchRenderer } from "@pixi/core";
Renderer.registerPlugin("batch", BatchRenderer);
import { TickerPlugin } from "@pixi/ticker";
Application.registerPlugin(TickerPlugin);
import { AppLoaderPlugin } from "@pixi/loaders";
Application.registerPlugin(AppLoaderPlugin);
//import * as PIXI from "@pixi/app";
import { Application } from "@pixi/app";
import { Sprite } from "@pixi/sprite";
import { Rectangle } from "@pixi/math";

const app = new Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x104ea9,
  resolution: window.devicePixelRatio || 1,
});

const intro = document.querySelector(".intro");
intro.appendChild(app.view);

const aliens = [];

const totalDudes = 10;

for (let i = 0; i < totalDudes; i++) {
  // create a new Sprite that uses the image name that we just generated as its source
  const dude = Sprite.from("assets/imgs/top_dude.webp");
  // set the anchor point so the texture is centerd on the sprite
  dude.anchor.set(0.5);
  // set a random scale for the dude - no point them all being the same size!
  dude.scale.set(0.3 + Math.random() * 0.3);
  // finally lets set the dude to be at a random position..
  dude.x = Math.random() * app.screen.width;
  dude.y = Math.random() * app.screen.height;
  //dude.tint = Math.random() * 0xffffff;
  // create some extra properties that will control movement :
  // create a random direction in radians. This is a number between 0 and PI*2 which is the equivalent of 0 - 360 degrees
  dude.direction = Math.random() * Math.PI * 2;
  // this number will be used to modify the direction of the dude over time
  dude.turningSpeed = Math.random() - 0.5;
  // create a random speed for the dude between 2 - 4
  dude.speed = 1 + Math.random() * 2;
  // finally we push the dude into the aliens array so it it can be easily accessed later
  aliens.push(dude);
  app.stage.addChild(dude);
}

// create a bounding box for the little dudes
const dudeBoundsPadding = 100;
const dudeBounds = new Rectangle(
  -dudeBoundsPadding,
  -dudeBoundsPadding,
  app.screen.width + dudeBoundsPadding * 2,
  app.screen.height + dudeBoundsPadding * 2
);

app.ticker.add(() => {
  // iterate through the dudes and update their position
  for (let i = 0; i < aliens.length; i++) {
    const dude = aliens[i];
    dude.direction += dude.turningSpeed * 0.01;
    dude.x += Math.sin(dude.direction) * dude.speed;
    dude.y += Math.cos(dude.direction) * dude.speed;
    dude.rotation = -dude.direction - Math.PI / 2;

    // wrap the dudes by testing their bounds...
    if (dude.x < dudeBounds.x) {
      dude.x += dudeBounds.width;
    } else if (dude.x > dudeBounds.x + dudeBounds.width) {
      dude.x -= dudeBounds.width;
    }
    if (dude.y < dudeBounds.y) {
      dude.y += dudeBounds.height;
    } else if (dude.y > dudeBounds.y + dudeBounds.height) {
      dude.y -= dudeBounds.height;
    }
  }
});
