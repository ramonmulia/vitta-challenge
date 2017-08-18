const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const Factory = require('./lib/territories/territories.factory');

const { PORT } = require('./lib/config/config.app');
const MongoAdapter = require('./lib/adapters/adapters.mongo');
const Logger = require('./logger')('./server.js');
const territories = require('./lib/territories/territories.route');

const app = express();
const mongoAdapter = MongoAdapter();
global.factory = new Factory();

app.set('port', PORT);
app.use(morgan(':method :url - :status', { stream: Logger.stream }));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/territories', territories);

function upServer() {
  if (process.env.NODE_ENV !== 'test') {
    mongoAdapter.connect()
      .then(() => {
        app.listen(app.get('port'), () => Logger.info(`Server is running at port: ${app.get('port')}.`));
      })
      .catch((err) => {
        Logger.error('Error when trying to connect with database: %j', err);
        process.exit(1);
      });
  }
}

upServer();

module.exports = app;
