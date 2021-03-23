const express = require('express');
const UsuarioController = require('../controllers/Usuario');

const usuario = express.Router();

usuario.post('/login', UsuarioController.login);

usuario.get('/', UsuarioController.getUsersPlune);

module.exports = usuario;