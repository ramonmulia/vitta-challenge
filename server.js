const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const Factory = require('./server/lib/territories/territories.factory');

const { PORT } = require('./server/lib/config/config.app');
const MongoAdapter = require('./server/lib/adapters/adapters.mongo');
const Logger = require('./server/logger')('./server.js');
const territories = require('./server/lib/territories/territories.route');
const squares = require('./server/lib/squares/squares.route');

const app = express();
const mongoAdapter = MongoAdapter();
global.factory = new Factory();

app.set('port', PORT);
app.use(morgan(':method :url - :status', { stream: Logger.stream }));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('./public'));
app.set('views', './public/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.get('/dashboard', (req, res) => res.render('dashboard'));

app.use('/territories', territories);
app.use('/squares', squares);

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
