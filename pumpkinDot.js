const PI2 = Math.PI * 2;
const BOUNCE = 0.8;

export default class PumpkinDot {
  constructor(x, y, radius, pixelSize, red, green, blue, scale = 1) {
    this.x = x;
    this.y = y;

    this.targetRadius = radius;
    this.radius = 0;
    this.radiusV = 0;
    this.radius = radius;
    this.pixelSize = pixelSize;
    this.red = red;
    this.green = green;
    this.blue = blue;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(
      this.x - this.pixelSize/2,
      this.y - this.pixelSize/2,
      this.pixelSize, 
      this.pixelSize
    );

    const accel = (this.targetRadius - this.radius) / 2;
    this.radiusV += accel;
    this.radiusV *= BOUNCE;
    this.radius += this.radiusV;

    ctx.beginPath();
    ctx.fillStyle = `rgb(${this.red}, ${this.green}, ${this.blue})`;
    ctx.arc(this.x, this.y, this.radius, 0, PI2, false);
    ctx.fill();

    //left eye
    ctx.beginPath();
    ctx.fillStyle = '#000';
    ctx.moveTo(this.x - this.radius/2, this.y - this.radius/2);
    ctx.lineTo(this.x - this.radius/8, this.y + this.radius/8);
    ctx.lineTo(this.x - this.radius/5*3, this.y + this.radius/8);
    ctx.lineTo(this.x - this.radius/2, this.y - this.radius/2);
    ctx.fill();
    
    // right eye
    ctx.beginPath();
    ctx.fillStyle = '#000';
    ctx.moveTo(this.x + this.radius/2, this.y - this.radius/2);
    ctx.lineTo(this.x + this.radius/5*3, this.y + this.radius/8);
    ctx.lineTo(this.x + this.radius/8, this.y + this.radius/8);
    ctx.lineTo(this.x + this.radius/2, this.y - this.radius/2);
    ctx.fill();

    // mouth
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#000';
    ctx.moveTo(this.x - this.radius/4*3, this.y+ this.radius/4);
    ctx.lineTo(this.x - this.radius/3, this.y + this.radius/4*3);
    ctx.lineTo(this.x, this.y+ this.radius/2);
    ctx.lineTo(this.x + this.radius/3, this.y + this.radius/4*3);
    ctx.lineTo(this.x + this.radius/4*3, this.y+ this.radius/4);
    ctx.stroke();

    //stem
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#000';
    ctx.moveTo(this.x, this.y - this.radius/4*3);
    ctx.lineTo(this.x, this.y - this.radius/4*5);
    ctx.stroke();
  }

  reset() {
    this.radius = 0;
    this.radiusV = 0;
  }

}
