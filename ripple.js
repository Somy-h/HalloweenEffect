import { distance } from "./utils.js"
export default class Ripple {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.radius = 0;
    this.maxRadius = 0;
    this.speed = 10;
  }

  resize(width, height) {
    this.width = width;
    this.height = height;
  }

  start(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 0;
    this.maxRadius = this.getMaxRadius(x, y);
  }

  draw(ctx) {
    if (this.radius < this.maxRadius) {
      this.radius += this.speed;
    }
    ctx.beginPath();
    ctx.fillStyle = '#000';
    ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
    ctx.fill();
  }

  getMaxRadius (x, y) {
    const c1 = distance(0, 0, x, y);
    const c2 = distance(this.width, 0, x, y);
    const c3 = distance(0, this.height, x, y);
    const c4 = distance(this.width, this.height, x, y);
    return Math.max(c1, c2, c3, c4);
  }
}