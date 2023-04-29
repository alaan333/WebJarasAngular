'use strict'

var mongoose=require('mongoose');
var app = require('./app');
var port=3232;

const password='GyNcBS8C0fXF5Rso'
const url='mongodb+srv://AlanJaras:'+password+'@clusterzero.tamdwcu.mongodb.net/backendwebjaras'

//para conectar al database
mongoose.Promise=global.Promise;
mongoose.set('strictQuery', true);
mongoose.connect(url)
        //En el caso que conecte bien
        .then(()=>{
            console.log('Conexion a backjaras establecida')

            //Crear servidor
            app.listen(port,()=>{
                console.log('Servidor corriendo')
            })

        })
        //En el caso de que haya un error
        .catch(err=>{
            console.log(err)
        })