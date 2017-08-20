const Service = require('./squares.service');
const hal = require('./squares.hal');

const sService = Service();
const DEFAULT_ERROR_MESSAGE = 'Server error';
const DEFAULT_STATUS_ERROR = 500;

const SquaresController = {
  get,
  patch
};

function get(req, res) {
  const { params: { x, y } } = req;

  sService.get(x, y)
    .then((result) => {
      if (!result.foundTerritory) {
        return res.status(404).send({ error: 'not-found' });
      }
      return res.status(200).send(hal.one(x, y, result));
    })
    .catch(err => res.status(err.status || DEFAULT_STATUS_ERROR).send({ error: err.error || DEFAULT_ERROR_MESSAGE }));
}

function patch(req, res) {
  const { params: { x, y } } = req;

  sService.patch(x, y)
    .then((result) => {
      if (!result.foundTerritory) {
        return res.status(404).send({ error: 'not-found' });
      }
      return res.status(200).send(hal.one(x, y, result));
    })
    .catch(err => res.status(err.status || DEFAULT_STATUS_ERROR).send({ error: err.error || DEFAULT_ERROR_MESSAGE }));
}

module.exports = function factory() {
  return SquaresController;
};
