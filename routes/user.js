'use strict'

var express = require('express');
var userController = require('../controllers/UserController');
var auth = require('../middlewares/authenticate');
var multipart = require('connect-multiparty');
var path = multipart({uploadDir: './uploads/perfiles'});


var api = express.Router();

api.post('/registro',userController.registro);
api.post('/login',userController.login);
api.get('/usuarios/:nombre?',userController.users);
api.put('/usuarios/img/:id',path,userController.update_foto);
api.get('/usuarios/img/:img',path,userController.get_imagen);
api.get('/usuario/:id',userController.get_user);
api.put('/usuario/editar/:id',path,userController.editar_config);
api.get('/usuario/activar/:id',userController.activar_estado);
api.get('/usuario/desactivar/:id',userController.desactivar_estado);

module.exports = api;