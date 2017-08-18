const express = require('express');
const Controller = require('./squares.controller');

const router = express.Router();
const controller = Controller();

router.route('/:x/:y')
  .get(controller.get);

module.exports = router;
