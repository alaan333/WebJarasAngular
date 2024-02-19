'use strict'

var express=require('express');
var bodyparser=require('body-parser');

var appUser=express();

var user_routes=require('./routes/user') 

//middlewares
appUser.use(bodyparser.urlencoded({extended:false}));
appUser.use(bodyparser.json());

//configuration headers 
appUser.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


appUser.use('/api',user_routes)


module.exports=appUser;

