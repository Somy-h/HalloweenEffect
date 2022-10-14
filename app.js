import { BounceString } from './bounceString.js';
import { Spider } from './spider.js';
import { getDetectSide } from "./utils.js";
import { TextEffect } from './textEffect.js';
class App {
  constructor() {
    this.canvas = document.createElement('canvas');
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.canvas.style.background = '#eb6123';

    this.pixelRatio =  1;
    //this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
    window.addEventListener('resize', this.resize.bind(this));
    
    this.resize();
    this.init();

    document.addEventListener('pointermove', this.onMove.bind(this));

    window.requestAnimationFrame(this.animate.bind(this));
  }

  init() {
    this.moveX = -500;
    this.moveY = -500;
  }

  resize() {
    this.width = document.body.clientWidth;
    this.height = document.body.clientHeight;

    this.canvas.width = this.width * this.pixelRatio;
    this.canvas.height = this.height * this.pixelRatio;
    this.ctx?.scale(this.pixelRatio, this.pixelRatio);
    this.setup();
  }

  setup() {
    this.strings = [];
    this.topSpiders = [];
    this.webColor = 'black';
    this.setupWeb();

    let src = "./images/1.png"
    this.spider = new Spider(this.width/2, this.height/2, 40, src);
    src = "./images/spritesheet.png";
    this.topSpiders.push(new Spider(this.width/4, 0, 38, src, 1));
    this.topSpiders.push(new Spider(this.width/3, 0, 38, src, 0.5));
    this.topSpiders.push(new Spider(this.width/4*3, 0, 38, src, 0.7));
    
    //text- happy halloween by defaut
    this.text = new TextEffect("👻 Happy Halloween 👻", 'black', 5);
  }

  setupWeb() {
    const radius = Math.min(this.width, this.height) / 2 - 70;
    this.density = 10;
    
    const gap = radius / this.density;
    this.centerX = Math.round(this.width / 2);
    this.centerY = Math.round(this.height / 2);

    for (let i = 0; i < 8; i++) {
      this.strings[i] = [];
      for (let d = 1; d <= this.density; d++) {
        this.strings[i].push(
            new BounceString(
              {
                x : Math.round(this.centerX + (gap * (d+2)) * Math.cos(i * 2 * Math.PI / 8)),
                y : Math.round(this.centerY + (gap * (d+2)) * Math.sin(i * 2 * Math.PI / 8))
              },
              {
                x : Math.round(this.centerX + (gap * (d+2)) * Math.cos((i+1) * 2 * Math.PI / 8)),
                y : Math.round(this.centerY + (gap * (d+2)) * Math.sin((i+1) * 2 * Math.PI / 8))
              },
              this.webColor,
              i //responseIndex
            )
        );
      }
    }
  }

  animate(t) {
    this.draw(t);
    window.requestAnimationFrame(this.animate.bind(this));
  }

  draw(t) {
    this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // // draw webs
    this.strings?.forEach(bounceStrings =>
      bounceStrings.forEach(bounceString => 
        bounceString.draw(this.ctx, this.spider.x, this.spider.y, this.centerX, this.centerY, this.detectIdx)
      )
    );

    this.drawWebCenterLines(); 
  
    // draw spider by mouse interaction
    this.spider?.draw(this.ctx);

    // draw top spirders
    this.topSpiders?.forEach(spider => spider.drawWithWeb(this.ctx, t, this.height, this.webColor));
    this.text.draw(this.ctx, t, this.height);
    this.moveX = this.spider.x;
    this.moveY = this.spider.y;
  }

  drawWebCenterLines() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.webColor;

    this.ctx?.moveTo(0, this.height / 2);
    this.ctx?.lineTo(this.width, this.height/2)

    // draw lines with (45 * i) degree and center point
    for (let i = 1; i < 4; i++) { // half of octagon
      let x1 = this.centerX + (this.height - this.centerY)/Math.round(Math.tan(45*i * Math.PI /180));
      let x2 = this.centerX + (0 - this.centerY)/Math.round(Math.tan(45*i * Math.PI /180));
      this.ctx?.moveTo(x1, this.height);
      this.ctx?.lineTo(x2, 0);
    }
    this.ctx.stroke();
  }

  onMove(e) {
    this.spider.x = e.clientX;
    this.spider.y = e.clientY;
    this.detectIdx = getDetectSide(this.centerX, this.centerY, this.spider.x, this.spider.y);
  }
}

window.onload = () => new App();