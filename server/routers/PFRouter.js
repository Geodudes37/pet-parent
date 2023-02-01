const express = require('express');
const PFController = require('../controllers/PFController.js');

const PFRouter = express.Router();

PFRouter.get('/pets', PFController.getPets, (req, res) => {
  return res.status(200).send(res.locals.pets);
});

// NPSRouter.get('/parks/:parkCode', NPSController.getPark, (_req, res) => {
//   return res.status(200).send(res.locals.parkData);
// });

// NPSRouter.get(
//   '/modalInfo/:parkCode',
//   NPSController.getPark,
//   NPSController.getModalInfo,
//   weatherController.getWeather,
//   (_req, res) => {
//     return res.status(200).json(res.locals.modalInfo);
//   }
// );

module.exports = PFRouter;
