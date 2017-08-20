const chai = require('chai');
const request = require('supertest-as-promised');
const app = require('../../server');
const territoriesCollection = require('../territories.collection');
const TerritoryService = require('../../server/lib/territories/territories.service');
const SquaresService = require('../../server/lib/squares/squares.service');

const expect = chai.expect;
const TERRITORIES_ENDPOINT = '/territories';
const territoryService = TerritoryService();
const squaresService = SquaresService();

describe('Territories - Integration Tests', () => {
  it('Should create territory correctly', (done) => {
    const territory = territoriesCollection.success[0];

    request(app)
      .post(`${TERRITORIES_ENDPOINT}`)
      .send(territory)
      .then((res) => {
        expect(res.statusCode).to.equal(201);
        done();
      })
      .catch(console.log);
  });

  it('Should get 2 territories correctly', (done) => {
    const territory = territoriesCollection.success[0];
    const territory1 = territoriesCollection.success[1];

    territoryService.create(territory)
      .then(() => territoryService.create(territory1))
      .then(() => {
        request(app)
          .get(`${TERRITORIES_ENDPOINT}`)
          .then((res) => {
            expect(res.statusCode).to.equal(200);
            done();
          });
      })
      .catch(console.log);
  });

  it('Should get 2 territories correctly with painted_area field', (done) => {
    const territory = territoriesCollection.success[0];
    const territory1 = territoriesCollection.success[1];

    territoryService.create(territory)
      .then(() => territoryService.create(territory1))
      .then(() => {
        request(app)
          .get(`${TERRITORIES_ENDPOINT}?withpainted=true`)
          .then((res) => {
            expect(res.statusCode).to.equal(200);
            done();
          });
      })
      .catch(console.log);
  });

  it('Should return first territory painted correctly with painted_area field', (done) => {
    const territory = territoriesCollection.success[0];
    const territory1 = territoriesCollection.success[1];

    territoryService.create(territory)
      .then(() => territoryService.create(territory1))
      .then(() => squaresService.patch(25, 25))
      .then(() => {
        request(app)
          .get(`${TERRITORIES_ENDPOINT}?withpainted=true`)
          .then((res) => {
            expect(res.statusCode).to.equal(200);
            done();
          });
      })
      .catch(console.log);
  });

  it('Should return second territory painted correctly with painted_area field', (done) => {
    const territory = territoriesCollection.success[0];
    const territory1 = territoriesCollection.success[1];

    territoryService.create(territory)
      .then(() => territoryService.create(territory1))
      .then(() => squaresService.patch(65, 64))
      .then(() => {
        request(app)
          .get(`${TERRITORIES_ENDPOINT}?withpainted=true`)
          .then((res) => {
            expect(res.body.data[1].painted_area).to.be.equal(1);
            expect(res.body.count).to.be.equal(2);
            expect(res.statusCode).to.equal(200);
            done();
          });
      })
      .catch(console.log);
  });
});
