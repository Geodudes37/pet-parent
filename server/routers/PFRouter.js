const express = require('express');
const PFController = require('../controllers/PFController.js');

const PFRouter = express.Router();

PFRouter.post('/pets', PFController.getPets, (req, res) => {
  return res.status(200).send(res.locals.pets);
});

PFRouter.get('/pet', PFController.getPet, (req, res) => {
  return res.status(200).send(res.locals.pet);
});

module.exports = PFRouter;
