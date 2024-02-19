'use strict'

var mongoose=require('mongoose');
var app = require('./app-article');
var appUser=require('./app-user')

var port=3232;
var portUser=3333;

//database
const password='GyNcBS8C0fXF5Rso'
const url='mongodb+srv://AlanJaras:'+password+'@clusterzero.tamdwcu.mongodb.net/backendwebjaras'

//for conect to database
mongoose.Promise=global.Promise;
mongoose.set('strictQuery', true);
mongoose.connect(url)   
        //En el caso que conecte bien
        .then(()=>{
            console.log('Conexion a backend jaras establecida')

            //Create server
            app.listen(port,()=>{console.log('Servidor articulos corriendo')}),
            appUser.listen(portUser,()=>{console.log('Servidor usuario corriendo')})

        })
        //En el caso de que haya un error
        .catch(err=>{
            console.log(err,)
        })