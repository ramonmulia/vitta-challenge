const MongoAdapter = require('../adapters/adapters.mongo');

const mongoAdapter = MongoAdapter();
const COLLECTION = 'errors';

const ErrosService = {
  save
};

function save(payload) {
  const Model = mongoAdapter.getState().collection(COLLECTION);
  console.log(payload);
  Model.insert(payload);
}

module.exports = function factory() {
  return ErrosService;
};
