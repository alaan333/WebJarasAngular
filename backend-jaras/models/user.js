'use strict'

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var UserSchema= Schema({
    name:String,
    surname:String,
    email:{type:String,unique:true}, //unique for not repeat on database
    password:String,
    cart:Array
});

module.exports=mongoose.model('User',UserSchema); //mongoose transform "User" to "users", as it appears in the database, and save the information there