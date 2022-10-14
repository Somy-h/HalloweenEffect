import { lineCircle, insideDetectOctagonIdx } from "./utils.js";
const BOUNCE = 0.92;

// Reference from 
// https://www.youtube.com/watch?v=dXhAQbE8iBg
export class BounceString {
  // responseIndex : only for response for 1/8 sides of octagon
  constructor(posA, posB, color, responseIndex) {
  
    // looks like real spiderweb like not straight line
    let controlValX = 15;
    let controlValY = 15;
    switch (responseIndex) {
      case 0 : 
      case 1 :
        controlValX *= -1;
        controlValY *= -1;
        break;
      case 2 :
      case 3 :
        controlValY *= -1;
        break;
      case 6 :
      case 7 :
        controlValX *= -1;
        break;
    } 

    const middleX = Math.round(((posB.x - posA.x) / 2) + posA.x);
    const middleY = Math.round(((posB.y - posA.y) / 2) + posA.y);
    this.points = [
      { // starting point
        x: posA.x,
        y: posA.y,
        ox: posA.x, 
        oy: posA.y,
        vx: 0,  
        vy: 0,
      },
      { // control point
        x: middleX + controlValX,   // current point on curve
        y: middleY + controlValY,
        ox: middleX + controlValX,  // original point
        oy: middleY + controlValY,
        vx: 0,        // vibration value
        vy: 0,
      },
      { // end point
        x: posB.x,
        y: posB.y,
        ox: posB.x,
        oy: posB.y,
        vx: 0,
        vy: 0,
      },
    ];

    this.detect = 20;
    this.color = color;
  }

  draw(ctx, moveX, moveY, centerX, centerY, detectIdx = -1) {

    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 4;
      
    if (lineCircle(
        this.points[0].x,
        this.points[0].y,
        this.points[2].x,
        this.points[2].y,
        moveX,
        moveY,
        this.detect
      ) && insideDetectOctagonIdx(
        this.points[0].x,
        this.points[0].y,
        this.points[2].x,
        this.points[2].y,
        moveX,
        moveY,
        centerX,
        centerY,
        detectIdx
      )
    ) {
      ctx.strokeStyle = '#1A6C8A';
      this.detect = 100;
      let tx = (this.points[1].ox + moveX) /2;
      let ty = (this.points[1].oy + moveY) /2;
      this.points[1].vx = tx - this.points[1].x;
      this.points[1].vy = ty - this.points[1].y;

    } else {
      this.detect = 20;
      let tx = this.points[1].ox;
      let ty = this.points[1].oy;
      this.points[1].vx += tx - this.points[1].x;
      this.points[1].vx *= BOUNCE;
      this.points[1].vy += ty - this.points[1].y;
      this.points[1].vy *= BOUNCE;
    }
      this.points[1].x += this.points[1].vx;
      this.points[1].y += this.points[1].vy;

    let prevX = this.points[0].x;
    let prevY = this.points[0].y;

    ctx.moveTo(prevX, prevY);
    for (let i = 1; i < this.points.length; i++) {
      const cx = (prevX + this.points[i].x) / 2;
      const cy = (prevY + this.points[i].y) / 2;

      ctx.quadraticCurveTo(prevX, prevY, cx, cy);

      prevX = this.points[i].x;
      prevY = this.points[i].y;
    }

    ctx.lineTo(prevX, prevY);
    ctx.stroke();   
  }
}

