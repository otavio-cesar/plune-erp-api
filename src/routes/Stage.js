const express = require('express');
const StageController = require('../controllers/Stage');

const stage = express.Router();

stage.get('/order/:id', StageController.getStagePluneByIdOrder);
stage.patch('/pathStageSituation/', StageController.patchStageSituation);
stage.get('/getPossibleStageSituation/', StageController.getPossibleStageSituation);

module.exports = stage;