const chai = require('chai');
const Factory = require('../../server/lib/territories/territories.factory');

const expect = chai.expect;

describe('Territories - Unit Tests', () => {
  it('Should return Area correctly', (done) => {
    const factory = new Factory();
    const start = { x: 0, y: 25 };
    const end = { x: 70, y: 100 };

    factory.createTerritory('A', start, end);

    expect(factory.territories[0].area).to.be.equal(5250);
    done();
  });

  it('Should return Excpetion invalid area top left square', (done) => {
    const factory = new Factory();
    try {
      factory.createTerritory('A', { x: 10, y: 20 }, { x: 20, y: 40 });
      factory.createTerritory('B', { x: 5, y: 30 }, { x: 15, y: 40 });
    } catch (err) {
      done();
    }
  });

  it('Should return Excpetion invalid area bottom right square', (done) => {
    const factory = new Factory();
    try {
      factory.createTerritory('A', { x: 10, y: 20 }, { x: 20, y: 40 });
      factory.createTerritory('B', { x: 15, y: 20 }, { x: 20, y: 30 });
    } catch (err) {
      done();
    }
  });

  it('Should return Excpetion invalid area top right square', (done) => {
    const factory = new Factory();
    try {
      factory.createTerritory('A', { x: 10, y: 20 }, { x: 20, y: 40 });
      factory.createTerritory('B', { x: 15, y: 30 }, { x: 20, y: 40 });
    } catch (err) {
      done();
    }
  });

  it('Should return Excpetion invalid area bottom left square', (done) => {
    const factory = new Factory();
    try {
      factory.createTerritory('A', { x: 10, y: 20 }, { x: 20, y: 40 });
      factory.createTerritory('B', { x: 5, y: 25 }, { x: 13, y: 25 });
    } catch (err) {
      done();
    }
  });

  it('Should return Excpetion invalid area bottom left square', (done) => {
    const factory = new Factory();
    try {
      factory.createTerritory('A', { x: 10, y: 20 }, { x: 20, y: 40 });
      factory.createTerritory('B', { x: 16, y: 12 }, { x: 25, y: 25 });
    } catch (err) {
      done();
    }
  });


  it('Should create territories correctly', (done) => {
    const factory = new Factory();
    factory.createTerritory('A', { x: 10, y: 20 }, { x: 20, y: 40 });
    factory.createTerritory('B', { x: 15, y: 10 }, { x: 20, y: 15 });

    expect(factory.territories.length).to.be.equal(2);
    done();
  });
});
