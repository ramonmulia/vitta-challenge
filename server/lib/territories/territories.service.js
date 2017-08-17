const tv4 = require('tv4');
const schema = require('./territories.schema');
const Logger = require('../../logger')('./territories/service.js');
const MongoAdapter = require('../adapters/adapters.mongo');

const mongoAdapter = MongoAdapter();
const COLLECTION = 'territories';

const TerritoriesService = {
  create,
  get
};

function create(payload) {
  return new Promise((resolve, reject) => {
    const Model = mongoAdapter.getState().collection(COLLECTION);
    const valid = tv4.validate(payload, schema);
    const territory = Object.assign({}, payload);

    if (!valid) {
      return reject({ status: 400, error: 'Payload inválido.' });
    }

    return Model.insert(territory)
      .then(doc => resolve(doc.ops[0]))
      .catch((err) => {
        Logger.error(`Error when trying to save territory. Error: ${err} %j`, err);
        return reject({ status: 500, error: 'Error when trying to save territory.' });
      });
  });
}

function get(query) {
  return new Promise((resolve, reject) => {
    const Model = mongoAdapter.getState().collection(COLLECTION);

    Model.find(query)
      .toArray((err, debits) => {
        if (err) {
          Logger.error(`Error when trying to get territory. Error: ${err} %j`, err);
          return reject({ status: 500, error: 'Error when trying to get territory.' });
        }

        return resolve(debits);
      });
  });
}

module.exports = function factory() {
  return TerritoriesService;
};
