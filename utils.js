export function distance(x1, y1, x2, y2) {
  const x = x2 - x1;
  const y = y2 - y1;
  return Math.sqrt(x * x + y * y);
}


export function collide(x1, y1, x2, y2, radius) {
  if (distance(x1, y1, x2, y2) <= radius) {
    return true;
  } else {
    return false;
  }
}

export function getBWValue(red, green, blue, isReversed) {
  const detect = 2;
  if (!isReversed) {
    return 255 - Math.floor((red + green + blue) / detect)
  } else {
    return Math.floor((red + green + blue) / detect);
  }
}

//The Uint8ClampedArray contains height × width × 4 bytes of data, 
//with index values ranging from 0 to (height×width×4)-1.

export function getColorIndices(x, y, width) {
  const red = (x + y * width) * 4;
  return [red, red + 1, red + 2, red + 3];
}


export function pointCircle(px, py, cx, cy, r) {
  return (distance(px, py, cx, cy) <= r) 
}

export function lineCircle(x1, y1, x2, y2, cx, cy, r) {
  const lineLength = distance(x1, y1, x2, y2);
  const point = (((cx - x1) * (x2 - x1)) + ((cy - y1) * (y2 - y1))) / Math.pow(lineLength, 2);

  const px = x1 + (point * (x2 - x1));
  const py = y1 + (point * (y2 - y1));

  let result = (distance(px, py, cx, cy) < r);
  return  result ? true : false;

}

export function insideDetectOctagonIdx(x1, y1, x2, y2, cx, cy, centerX, centerY, detectIdx) {

  let result = false;
  centerX = Math.floor(centerX);
  centerY = Math.floor(centerY);

  switch (detectIdx) {
    case 0: 
      return x1 > centerX && x2 > centerX && y1 <= centerY && y2 > centerY;
    case 1: 
      return x1 > centerX && x2 == centerX && y1 > centerY && y2 > centerY;
    case 2: 
      return x1  == centerX && x2 < centerX && y1 > centerY && y2 > centerY;
    case 3:
      return x1  < centerX && x2 < centerX && y1 > centerY && y2 == centerY;
    case 4:
      return x1  < centerX && x2 < centerX && y1 == centerY && y2 < centerY;
    case 5:
      return x1  < centerX && x2 == centerX && y1 < centerY && y2 < centerY;
    case 6:
      return x1  == centerX && x2 > centerX && y1 < centerY && y2 < centerY;
    case 7:
      return x1  > centerX && x2 > centerX && y1 < centerY && y2 == centerY;
  }
  return result;
}

export function getDetectSide(centerX, centerY, x, y) {

  let angle = Math.atan((y - centerY) /(x - centerX ))* 180 / Math.PI;

  let result = -1;
  if (y - centerY > 0) { 
    if (angle > 0 && angle < 45) return 0;
    if (angle > 45 && angle < 90) return 1;
    if (angle < -45 && angle > -90) return 2;
    if (angle < 0 && angle > - 45) return 3;
  } else {
    if (angle > 0 && angle < 45) return 4;
    if (angle > 45 && angle < 90) return 5;
    if (angle < -45 && angle > -90) return 6;
    if (angle < 0 && angle > - 45) return 7;
  }
  return result;
}

export function getRectPointFromCenter(x, y, w, h, isTranslated = false) {
  return {
    x: isTranslated ? -w/2 : x - w/2,
    y: isTranslated ? -h/2 : y - h/2
  }
}