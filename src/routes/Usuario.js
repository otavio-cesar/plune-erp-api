const express = require('express');
const UsuarioController = require('../controllers/Usuario');

const usuario = express.Router();

usuario.get('/getToken', UsuarioController.getToken);
usuario.post('/alteraToken', UsuarioController.alteraToken);
usuario.post('/login', UsuarioController.login);
usuario.post('/convidar', UsuarioController.salvarUsuarioPCP);
usuario.get('/', UsuarioController.getUsersPlune);

module.exports = usuario;