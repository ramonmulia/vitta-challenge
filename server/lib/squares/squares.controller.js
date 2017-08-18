const Service = require('./territories.service');
const hal = require('./territories.hal');

const tService = Service();
const DEFAULT_ERROR_MESSAGE = 'Server error';
const DEFAULT_STATUS_ERROR = 500;

const SquaresController = {
  get
};

function get(req, res) {
  const { query } = req;

  tService.get(query)
    .then((result) => {
      if (!result.length) {
        return res.status(404).send([]);
      }

      return res.status(200).send(hal.list(result));
    })
    .catch(err => res.status(err.status || DEFAULT_STATUS_ERROR).send({ error: err.error || DEFAULT_ERROR_MESSAGE }));
}

module.exports = function factory() {
  return SquaresController;
};
