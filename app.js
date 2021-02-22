'use strict'

var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var users_routes = require('./routes/user');
var message_routes = require('./routes/message');
var User = require('./models/user');

// socket io
io.on('connection', function (socket) {

   
    console.log('User connected');
    socket.on('disconnect', function() {
        console.log('User disconnected');
    });

     //SEND MESSAGES
     socket.on('save-message', function (new_msm) {
        io.emit('new-message', { message: new_msm });
    });

    //CONFIG
    socket.on('save-user', function (user) {
        io.emit('get-user', { user: user });
    });

    //CONFIG
    socket.on('save-users', function (users) {
        io.emit('get-users', {users});
    });

    socket.on('save-identity', function (user) {
        io.emit('get-identity', {user});
    });



});

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

app.use((req,res,next)=>{
    res.header('Content-Type: application/json');
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});

mongoose.connect('mongodb://localhost:27017/stratpluschatdb',{useUnifiedTopology: true, useNewUrlParser: true}, (err,res)=>{
    if(err){
        throw err;
    }else{
        const user = new User({_id:"6033cfe304716421bc14935b", nombre:"General", email: "genaral@test.com", password:"general"});
        user.save();
        console.log("Corriendo....");

        server.listen(port, function(){
            console.log("Servidor " + port );
        });
    }
});

app.use('/api',users_routes);
app.use('/api',message_routes);

module.exports = app;