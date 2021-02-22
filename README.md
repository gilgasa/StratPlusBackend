# StratPlusBackend

## Rutas para API REST

rutas

```
USUARIOS
api.post('/registro',userController.registro);
api.post('/login',userController.login);
api.get('/usuarios/:nombre?',userController.users);
api.put('/usuarios/img/:id',path,userController.update_foto);
api.get('/usuarios/img/:img',path,userController.get_imagen);
api.get('/usuario/:id',userController.get_user);
api.put('/usuario/editar/:id',path,userController.editar_config);
api.get('/usuario/activar/:id',userController.activar_estado);
api.get('/usuario/desactivar/:id',userController.desactivar_estado);

MENSAJES

api.post('/messenger',messageController.send);
api.get('/messenger/:para/:de',messageController.data_messenger);



```


## Listo para ser revisado para vacante StratPlus

* Correr con dockerfile
* Correr con npm install y luego npm start
* docker-compose para correr mongo dentro de contenedor.
