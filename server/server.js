const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
global.moment = require('moment');

const { PORT } = require('./config/config.app');
const MongoAdapter = require('./adapters/adapters.mongo');
const Logger = require('./logger')('./server.js');

const passengersRoutes = require('./passengers/passengers.route');
const transportLinesRoutes = require('./transportLines/transportLines.route');
const debitsRoutes = require('./debits/debits.route');

const app = express();
const mongoAdapter = MongoAdapter();

global.moment.locale('pt-BR');

app.set('port', PORT);
app.use(morgan(':method :url - :status', { stream: Logger.stream }));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/passengers', passengersRoutes);
app.use('/api/transportlines', transportLinesRoutes);
app.use('/api/debits', debitsRoutes);

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
