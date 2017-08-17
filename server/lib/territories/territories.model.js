function Territory(name, start, end) {
  this.name = name || '';
  this.start = start || {};
  this.end = end || {};
  this.area = 0;
  this.invalidArea = false;
  this.painted_area = 0;
}

Territory.prototype.calculateArea = CalculateArea;

function CalculateArea() {
  if ((this.end.x && this.end.y) && (this.end.x && this.end.y)) {
    const x = this.end.x - this.start.x;
    const y = this.end.y - this.start.y;

    this.invalidArea = !isValidArea(x, y);

    if (this.invalidArea) {
      return 0;
    }

    this.area = x * y;
    return this.area;
  }

  this.invalidArea = true;
  return this.area;
}

function isValidArea(x, y) {
  if ((isNaN(x) || isNaN(y)) || (x <= 0 || y <= 0)) {
    return false;
  }

  return true;
}

module.exports = Territory;
