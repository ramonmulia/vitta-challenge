const Territory = require('./territories.model');

function Factory() {
  this.territories = [];
}

Factory.prototype.createTerritory = createTerritory;

function createTerritory(name, start, end) {
  const territory = new Territory(name, start, end);

  territory.calculateArea();

  if (territory.invalidArea) {
    throw new Error('Invalid territory');
  }

  const isValid = validateTerritories(this.territories, territory);

  if (!isValid) {
    throw new Error('Invalid territory');
  }

  this.territories.push(territory);


  return territory;
}


function validateTerritories(territories, t2) {
  let isValid = true;
  for (let i = 0; i < territories.length; i++) {
    const t1 = territories[i];

    if (!validateTerritory(t1, t2)) {
      isValid = false;
      break;
    }
  }

  return isValid;
}

function validateTerritory(t1, t2) {
  if (t2.start.y >= t1.start.y && t2.start.y <= t1.end.y) {
    if (t2.end.x >= t1.start.x && t2.end.x <= t1.end.x) {
      return false;
    }
  }
  return true;
}

module.exports = Factory;
