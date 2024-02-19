'use strict'

var express=require('express');
var UserController=require('../controllers/user');

var router=express.Router();

router.post('/save-user', UserController.saveUser);
router.get('/user/:id?', UserController.getUser);
router.get('/users', UserController.getUsers);
router.put('/user/:id',UserController.updateUser);

module.exports=router;
