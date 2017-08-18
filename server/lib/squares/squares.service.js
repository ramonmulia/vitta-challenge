const tv4 = require('tv4');
const schema = require('./territories.schema');
const Territory = require('./territories.model');
const Logger = require('../../logger')('./territories/service.js');
const MongoAdapter = require('../adapters/adapters.mongo');
const { InvalidTerritory, InvalidArea } = require('../../errorsExceptions');

const mongoAdapter = MongoAdapter();
const COLLECTION = 'territories';

const TerritoriesService = {
  create,
  get,
  getOne,
  remove
};

function create(payload) {
  return new Promise((resolve, reject) => {
    const Model = mongoAdapter.getState().collection(COLLECTION);
    const valid = tv4.validate(payload, schema);
    const territory = Object.assign({}, payload);

    if (!valid) {
      return reject({ status: 400, error: 'incomplete-data.' });
    }

    if (!global.factory.territories.length) {
      return get({})
        .then((territories) => {
          try {
            const territoryPayload = new Territory(territory.name, territory.start, territory.end);

            for (let i = 0; i < territories.length; i++) {
              const { name, start, end } = territories[i];
              global.factory.createTerritory(new Territory(name, start, end));
            }
            global.factory.createTerritory(territoryPayload);

            return Model.insert(territoryPayload)
              .then((doc) => {
                territoryPayload.id = doc.ops[0]._id;

                return resolve(territoryPayload);
              })
              .catch((err) => {
                Logger.error(`Error when trying to save territory. Error: ${err} %j`, err);
                return reject({ status: 500, error: 'Error when trying to save territory.' });
              });
          } catch (err) {
            if (err instanceof InvalidTerritory || err instanceof InvalidArea) {
              return reject({ status: 400, error: 'territory-overlay' });
            }
            return reject({ status: 500, error: 'Internal server error' });
          }
        });
    }

    try {
      const { name, start, end } = territory;
      const territoryPayload = new Territory(name, start, end);

      global.factory.createTerritory(territoryPayload);
      return Model.insert(territory)
        .then((doc) => {
          territoryPayload.id = doc.ops[0]._id;

          return resolve(territoryPayload);
        })
        .catch((err) => {
          Logger.error(`Error when trying to save territory. Error: ${err} %j`, err);
          return reject({ status: 500, error: 'Error when trying to save territory.' });
        });
    } catch (err) {
      if (err instanceof InvalidTerritory || err instanceof InvalidArea) {
        return { status: 400, error: 'territory-overlay' };
      }
      return { status: 500, error: 'Internal server error' };
    }
  });
}

function get(query) {
  return new Promise((resolve, reject) => {
    const Model = mongoAdapter.getState().collection(COLLECTION);

    Model.find(query)
      .toArray((err, territories) => {
        if (err) {
          Logger.error(`Error when trying to get territory. Error: ${err} %j`, err);
          return reject({ status: 500, error: 'Error when trying to get territory.' });
        }

        return resolve(territories);
      });
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    const Model = mongoAdapter.getState().collection(COLLECTION);

    Model.remove({ _id: id })
      .then(() => resolve())
      .catch(() => reject());
  });
}

function getOne(id) {
  return new Promise((resolve, reject) => {
    const Model = mongoAdapter.getState().collection(COLLECTION);

    Model.findOne({ _id: id })
      .then(result => resolve(result))
      .catch((err) => {
        Logger.error(`Error when trying to get one territory. Error: ${err} %j`, err);
        reject({ status: 500, error: 'Error when trying to get on territory.' });
      });
  });
}



module.exports = function factory() {
  return TerritoriesService;
};
