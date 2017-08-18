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
  mongoAdapter.wipeDB()
    .then(done)
    .catch(done);
});
