const chai = require('chai');
const request = require('supertest-as-promised');
const app = require('../../server');
const territoriesCollection = require('../territories.collection');
const TerritoryService = require('../../server/lib/territories/territories.service');

const expect = chai.expect;
const TERRITORIES_ENDPOINT = '/territories';
const SQUARES_ENDPOINT = '/squares';
const territoryService = TerritoryService();

describe('Squares - Integration Tests', () => {
  it('Should return square correctly', (done) => {
    const territory = territoriesCollection.success[0];

    request(app)
      .post(`${TERRITORIES_ENDPOINT}`)
      .send(territory)
      .then((res) => {
        expect(res.statusCode).to.equal(201);
        request(app)
          .get(`${SQUARES_ENDPOINT}/40/25`)
          .then((res) => {
            expect(res.statusCode).to.equal(200);
            done();
          });
      })
      .catch(console.log);
  });

  it('Should paint a square in territory correctly', (done) => {
    const territory = territoriesCollection.success[0];

    territoryService.create(territory)
      .then(() => {
        request(app)
          .patch(`${SQUARES_ENDPOINT}/40/25/paint`)
          .then((res) => {
            expect(res.statusCode).to.equal(200);
            done();
          });
      })
      .catch(console.log);
  });


  it('Should return not found when territory not found', (done) => {
    const territory = territoriesCollection.success[0];

    territoryService.create(territory)
      .then(() => {
        request(app)
          .patch(`${SQUARES_ENDPOINT}/40/75/paint`)
          .then((res) => {
            expect(res.statusCode).to.equal(404);
            done();
          });
      })
      .catch(console.log);
  });

  it('Should return territory painted', (done) => {
    const territory = territoriesCollection.success[0];

    territoryService.create(territory)
      .then(() => {
        request(app)
          .patch(`${SQUARES_ENDPOINT}/40/25/paint`)
          .then((res) => {
            request(app)
              .get(TERRITORIES_ENDPOINT)
              .then((res) => {
                expect(res.body.data[0].painted_area).to.equal(1);
                done();
              });
          });
      })
      .catch(console.log);
  });
});
