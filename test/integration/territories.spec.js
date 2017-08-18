const chai = require('chai');
const request = require('supertest-as-promised');
const app = require('../../server/server');
const territoriesCollection = require('../territories.collection');
const TerritoryService = require('../../server/lib/territories/territories.service');

const expect = chai.expect;
const TERRITORIES_ENDPOINT = '/territories';
const territoryService = TerritoryService();

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
      .catch((err) => {
        done(err);
      });
  });

  it.only('Should get territories correctly', (done) => {
    const territory = territoriesCollection.success[0];
    const territory1 = territoriesCollection.success[1];

    territoryService.create(territory)
      .then(() => territoryService.create(territory1))
      .then(() => {
        console.log('aaaa');
        request(app)
          .get(`${TERRITORIES_ENDPOINT}`)
          .then((res) => {
            console.log(res.body);
            expect(res.statusCode).to.equal(200);
            done();
          })
          .catch((err) => {
            done(err);
          });
      })
      .catch(err => console.log(err));
  });
});
