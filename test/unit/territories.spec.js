const chai = require('chai');
const Factory = require('../../server/lib/territories/territories.factory');
const Territory = require('../../server/lib/territories/territories.model');

const expect = chai.expect;

describe('Territories - Unit Tests', () => {
  it('Should return Area correctly', (done) => {
    const factory = new Factory();
    const territory = new Territory('A', { x: 0, y: 25 }, { x: 70, y: 100 });

    factory.createTerritory(territory);

    expect(factory.territories[0].area).to.be.equal(5250);
    done();
  });

  it('Should return Excpetion invalid area top left square', (done) => {
    const factory = new Factory();
    const territory1 = new Territory('A', { x: 10, y: 20 }, { x: 20, y: 40 });
    const territory2 = new Territory('B', { x: 5, y: 30 }, { x: 15, y: 40 });

    try {
      factory.createTerritory(territory1);
      factory.createTerritory(territory2);
    } catch (err) {
      done();
    }
  });

  it('Should return Excpetion invalid area bottom right square', (done) => {
    const factory = new Factory();
    const territory1 = new Territory('A', { x: 10, y: 20 }, { x: 20, y: 40 });
    const territory2 = new Territory('B', { x: 15, y: 20 }, { x: 20, y: 30 });

    try {
      factory.createTerritory(territory1);
      factory.createTerritory(territory2);
    } catch (err) {
      done();
    }
  });

  it('Should return Excpetion invalid area top right square', (done) => {
    const factory = new Factory();
    const territory1 = new Territory('A', { x: 10, y: 20 }, { x: 20, y: 40 });
    const territory2 = new Territory('B', { x: 15, y: 30 }, { x: 20, y: 40 });

    try {
      factory.createTerritory(territory1);
      factory.createTerritory(territory2);
    } catch (err) {
      done();
    }
  });

  it('Should return Excpetion invalid area bottom left square 2', (done) => {
    const factory = new Factory();
    try {
      const territory1 = new Territory('A', { x: 10, y: 20 }, { x: 20, y: 40 });
      const territory2 = new Territory('B', { x: 5, y: 25 }, { x: 13, y: 25 });
      factory.createTerritory(territory1);
      factory.createTerritory(territory2);
    } catch (err) {
      done();
    }
  });

  it('Should return Excpetion invalid area bottom left square', (done) => {
    const factory = new Factory();
    const territory1 = new Territory('A', { x: 10, y: 20 }, { x: 20, y: 40 });
    const territory2 = new Territory('B', { x: 16, y: 12 }, { x: 25, y: 25 });

    try {
      factory.createTerritory(territory1);
      factory.createTerritory(territory2);
    } catch (err) {
      done();
    }
  });


  it('Should create territories correctly', (done) => {
    const factory = new Factory();
    const territory1 = new Territory('A', { x: 10, y: 20 }, { x: 20, y: 40 });
    const territory2 = new Territory('B', { x: 15, y: 10 }, { x: 20, y: 15 });

    factory.createTerritory(territory1);
    factory.createTerritory(territory2);

    expect(factory.territories.length).to.be.equal(2);
    done();
  });

  it('Should return Exception territories correctly', (done) => {
    const factory = new Factory();
    const territory1 = new Territory('A', { x: 20, y: 10 }, { x: 65, y: 70 });
    const territory2 = new Territory('B', { x: 60, y: 25 }, { x: 70, y: 50 });

    try {
      factory.createTerritory(territory1);
      factory.createTerritory(territory2);
    } catch (err) {
      done();
    }
  });


});
