const MongoAdapter = require('../server/lib/adapters/adapters.mongo');

const mongoAdapter = MongoAdapter();

before((done) => {
  mongoAdapter.connect()
    .then(done)
    .catch(() => process.exit(1));
});

after(() => {
  mongoAdapter.close();
});

afterEach((done) => {
  if (global.factory) {
    global.factory.territories = [];
  }

  mongoAdapter.wipeDB()
    .then(done)
    .catch(done);
});
