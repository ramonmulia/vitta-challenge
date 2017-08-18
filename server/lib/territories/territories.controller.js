const Service = require('./territories.service');
const hal = require('./territories.hal');

const tService = Service();
const DEFAULT_ERROR_MESSAGE = 'Server error';
const DEFAULT_STATUS_ERROR = 500;

const TerritoriesController = {
  create,
  get,
  getOne,
  remove
};

function create(req, res) {
  const { body } = Object.assign({}, req);

  tService.create(body)
    .then(result => res.status(201).send(hal.one(result)))
    .catch(err => res.status(err.status || DEFAULT_STATUS_ERROR).send({ error: err.error || DEFAULT_ERROR_MESSAGE }));
}

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

function remove(req, res) {
  const { params } = req;

  tService.delete(params.id)
    .then(() => res.status(200).send({ error: false }))
    .catch(err => res.status(err.status || DEFAULT_STATUS_ERROR).send({ error: true }));
}

function getOne(req, res) {
  const { params } = req;

  tService.getOne(params.id)
    .then((result) => {
      if (!result) {
        return res.status(404).send([]);
      }

      return res.status(200).send(hal.one(result));
    })
    .catch(err => res.status(err.status || DEFAULT_STATUS_ERROR).send({ error: err.error || DEFAULT_ERROR_MESSAGE }));
}

module.exports = function factory() {
  return TerritoriesController;
};
