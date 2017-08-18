function Territory(name, start, end, paintedArea) {
  this.name = name || '';
  this.start = start || {};
  this.end = end || {};
  this.painted_area = paintedArea || 0;
  this.area = this.calculateArea();
}

Territory.prototype.calculateArea = calculateArea;
Territory.prototype.calculateSquares = calculateSquares;

function calculateArea() {
  if ((this.end.x && this.end.y) && (this.end.x && this.end.y)) {
    const x = this.end.x - this.start.x;
    const y = this.end.y - this.start.y;

    /*if (!isValidArea(x, y)) {
      console.log('globa ta de sacanagem ai nao heim');
      throw new InvalidArea();
    }*/

    return x * y;
  }
  return 0;
}

/*function isValidArea(x, y) {
  if ((isNaN(x) || isNaN(y)) || (x <= 0 || y <= 0)) {
    return false;
  }

  return true;
}*/

function calculateSquares() {
  const squares = [];

  for (let i = this.start.x; i <= this.end.x; i++) {
    for (let j = this.start.y; j <= this.end.y; j++) {
      squares.push({ x: i, y: j });
    }
  }

  return squares;
}

module.exports = Territory;
