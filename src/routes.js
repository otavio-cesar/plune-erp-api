const express = require('express');

const routes = express.Router();
const usuarioRoutes = require('./routes/Usuario')
const ordemRoutes = require('./routes/Ordem')
const stageRoutes = require('./routes/Stage')

routes.use('/usuario', usuarioRoutes)
routes.use('/ordem', ordemRoutes)
routes.use('/stage', stageRoutes)

module.exports = routes;