const Territory = require('./territories.model');
const { InvalidTerritory } = require('../../errorsExceptions');

function Factory() {
  this.territories = [];
}

Factory.prototype.createTerritory = createTerritory;

function createTerritory(territory) {
  const isValid = this.territories.length ? validateTerritories(this.territories, territory) : true;

  if (!isValid) {
    throw new InvalidTerritory();
  }

  this.territories.push(territory);

  return territory;
}

function validateTerritories(territories, t2) {
  const t2Squares = t2.calculateSquares();
  let isValid = true;

  for (let i = 0; i < territories.length; i++) {
    const { name, start, end } = territories[i];
    const t1Squares = new Territory(name, start, end).calculateSquares();

    if (!isValidTerritory(t1Squares, t2Squares)) {
      isValid = false;
      break;
    }
  }

  return isValid;
}

function isValidTerritory(squares1, squares2) {
  return !squares1.find(el => squares2.find(yEl => (yEl.x === el.x) && (yEl.y === el.y)));
}

module.exports = Factory;
