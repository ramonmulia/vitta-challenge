const Logger = require('../../logger')('./squares/service.js');
const ErrorsService = require('../errors/errors.service');
const TerritoriesService = require('../territories/territories.service');

const territoriesService = TerritoriesService();
const errorsService = ErrorsService();

const SquaresService = {
  get,
  patch
};

function patch(x, y) {
  return new Promise((resolve, reject) => {
    get(x, y)
      .then((squareObj) => {
        if (!squareObj.foundTerritory || squareObj.painted) {
          return resolve(squareObj);
        }

        const { territory } = squareObj;
        territory.painted_squares.push({ x: Number(x), y: Number(y) });

        return territoriesService.update(territory)
          .then(() => resolve({ painted: true, foundTerritory: true }))
          .catch((err) => {
            Logger.error(`Error when trying to paint territory. Error: ${err} %j`, err);
            return reject({ status: 400, error: 'Error when trying to paint territory.' });
          });
      })
      .catch((err) => {
        Logger.error(`Error when trying to patch square. Error: ${err} %j`, err);
        return reject({ status: 500, error: 'Error when trying to patch square.' });
      });
  });
}

function get(x, y) {
  return new Promise((resolve, reject) => {
    territoriesService
      .get({})
      .then((territories) => {
        let territoryFound;

        territories.every((t) => {
          const squares = t.calculateSquares();
          if (squares.find(el => (el.x === Number(x) && el.y === Number(y)))) {
            territoryFound = t;
            return false;
          }
          return true;
        });

        if (territoryFound) {
          const painted = (territoryFound.painted_squares || [{}]).find(el => (el.x === Number(x) && el.y === Number(y))) || false;
          return resolve({ painted, foundTerritory: true, territory: territoryFound });
        }

        return resolve({
          painted: false,
          foundTerritory: false
        });
      })
      .catch((err) => {
        Logger.error(`Error when trying to get square. Error: ${err} %j`, err);
        return reject({ status: 500, error: 'Error when trying to get square.' });
      });
  });
}

module.exports = function factory() {
  return SquaresService;
};
