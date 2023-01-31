const express = require('express');
const PFController = require('../controllers/PFController');

const PFRouter = express.Router();

PFRouter.get('/pets', NPSController.getParkCodes, (_req, res) => {
  return res.status(200).send(res.locals.parkCodes);
});

NPSRouter.get('/parks/:parkCode', NPSController.getPark, (_req, res) => {
  return res.status(200).send(res.locals.parkData);
});

NPSRouter.get(
  '/modalInfo/:parkCode',
  NPSController.getPark,
  NPSController.getModalInfo,
  weatherController.getWeather,
  (_req, res) => {
    return res.status(200).json(res.locals.modalInfo);
  }
);

module.exports = PFRouter;
