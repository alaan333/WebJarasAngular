'use strict'

var mongoose=require('mongoose');
//Definir el esquema de un modelo
var schema=mongoose.Schema;

var articleSchema=schema({
    category:String,            
    typeArticle:String,             
    size:String,                
    season:String,
    color:String,
    image:String,
    description:String,
    code:String,
    price:Number,
    offsale:Number
});

module.exports=mongoose.model('Article',articleSchema) 