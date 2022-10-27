
export default class TextEffect {
  constructor(text, color, speed) {
    this.text = text;
    this.color = color;
    this.speed = speed;
    this.currentIdx = -1;
    this.currentText = '';
    this.prevTime = 0;
    this.opacity = 0;
    this.opacityVal = 0.05;
  }

  draw(ctx, t, width, height) {
    if (this.prevTime == 0) {
      this.prevTime =t;
    }
    const now = (t - this.prevTime);
    if (now > 1000/this.speed) {
      this.prevTime = t;
      this.opacity += this.opacityVal;
      if (this.opacity >= 0.8 || this.opacity <= 0) {
        this.opacityVal *= -1;
      }
    }
  
    const fontWidth = 50;
    const fontSize =  width/18;
    const fontName = 'Hind';
    ctx.fillStyle = `rgba(0, 0, 0, ${this.opacity})`
    //ctx.font = "50px Hind";
    ctx.font = `${fontWidth} ${fontSize}px ${fontName}`;
    ctx.beginPath();
    ctx.fillText(this.text, 50, height - 50);
  }

  drawTypeWriter(ctx, t, height) {
    if (this.prevTime == 0) {
      this.prevTime =t;
    }
    const now = (t - this.prevTime);
    if (now > 1000/this.speed) {
      this.prevTime = t;
      this.currentIdx++;
      this.currentText += this.text.charAt(this.currentIdx);
      if (this.currentIdx >= this.text.length) {
        this.currentIdx = -1;
        this.currentText =  '';
      }
    }
    ctx.font = "50px serif";
    ctx.fillText(this.currentText, 50, height - 50);
  }
  

}