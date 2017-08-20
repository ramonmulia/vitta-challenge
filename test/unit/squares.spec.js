const chai = require('chai');
const Territory = require('../../server/lib/territories/territories.model');
const SquareService = require('../../server/lib/squares/squares.service');

const squareService = SquareService();
const expect = chai.expect;

describe('Squares - Unit Tests', () => {
  it('Should not found square in not exist Territory', (done) => {
    global.factory.createTerritory(new Territory('A', { x: 0, y: 25 }, { x: 70, y: 100 }));

    squareService.get(20, 10)
      .then((result) => {
        expect(result.foundTerritory).to.be.false;
        done();
      });
  });

  it('Should found square in exist Territory', (done) => {
    global.factory.createTerritory(new Territory('A', { x: 0, y: 25 }, { x: 70, y: 100 }));

    squareService.get(20, 30)
      .then((result) => {
        expect(result.foundTerritory).to.be.true;
        done();
      })
      .catch(console.log);
  });

  it('Should found square at second Territory', (done) => {
    global.factory.createTerritory(new Territory('A', { x: 0, y: 25 }, { x: 70, y: 100 }));
    global.factory.createTerritory(new Territory('A', { x: 0, y: 0 }, { x: 20, y: 10 }));

    squareService.get(5, 5)
      .then((result) => {
        expect(result.foundTerritory).to.be.true;
        done();
      });
  });
});
