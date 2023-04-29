//Configuracion de express
'use strict'

var express=require('express');
var bodyparser=require('body-parser');

var app=express();

var article_routes=require('./routes/article') 

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

//para configuracion de cabeceras 
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


app.use('/api',article_routes)


module.exports=app;


//req son los datos que le puedo estar enviando desde el cliente o peticion que haga, res es la response que voy a estar enviando
// app.get('/test',(req,res)=>{ 
//     res.status(200).send({
//         message:'Hola '
//     })
// })

