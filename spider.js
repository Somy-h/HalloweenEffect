import {getRectPointFromCenter} from './utils.js';
const PI2 = Math.PI * 2;

export default class Spider {
  constructor(x, y, radius, src, speed  = 0) {
    this.radius = radius;
    this.vx = speed;
    this.vy = speed;
    this.x = x;
    this.y = y;
    this.img = new Image();
    this.img.src = src;

    this.spiderWidth = 44;
    this.spiderHeight = 38;
    this.curFrame = 0;
    this.totalFrame = 3;
    this.fps = 5;
    this.prevTime = 0;
  }

  // draw a image
  draw(ctx) {
    let newPos = getRectPointFromCenter(this.x, this.y, this.radius, this.radius);
    ctx.drawImage(this.img, newPos.x- this.radius/2, newPos.y-this.radius/2, this.radius+ 5, this.radius);
  }

  // draw images sprite sheet
  drawWithWeb(ctx, time, stageHeight, color) {

    if (this.prevTime == 0) {
      this.prevTime = time;
    }
    const now = (time - this.prevTime);
    if (now > (1000 / this.fps)) {
      this.prevTime = time;
      this.curFrame++;
      if (this.curFrame >= this.totalFrame) {
        this.curFrame = 0;
      }
    }

    this.x;
    this.y += this.vy;

    const minY = 0 + Math.random()*2;
    const maxY = stageHeight / 2;

    if (this.y <= minY || this.y >= maxY) {
      this.vy *= -1;
    }    
    
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(this.x + 10, 0);
    ctx.lineTo(this.x + 10, this.y);
    ctx.stroke();

    let newPos = getRectPointFromCenter(this.x, this.y, this.radius, this.radius);
    // draw image of current frame
    ctx.drawImage(this.img, 
      this.curFrame * this.spiderWidth, 0, this.spiderWidth, this.spiderHeight,
      newPos.x, newPos.y, this.radius + 10, this.radius);
  }
} 