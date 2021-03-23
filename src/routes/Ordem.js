const express = require('express');
const OrdemController = require('../controllers/Ordem');

const ordem = express.Router();

ordem.get('/', OrdemController.getOrdemPlune);
ordem.get('/LineProduction', OrdemController.getOrdemPluneByLineProduction);
ordem.patch('/patchRefugar', OrdemController.patchRefugar);

module.exports = ordem;