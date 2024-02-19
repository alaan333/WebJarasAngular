'use strict'

var express=require('express');
var articleController=require('../controllers/article');

var router=express.Router();

var multipart=require('connect-multiparty');//se necesita para que node trabaje con los files que suba
var multipartMiddleware=multipart({uploadDir:'./uploads'})

// router.get('/home', articleController.home);
// router.post('/test',articleController.test);
router.post('/save-article',articleController.saveArticle);
router.get('/article/:id?', articleController.getArticle);
router.get('/articles',articleController.getAllArticles);
router.put('/article/:id',articleController.updateArticle);
router.delete('/article/:id',articleController.daleteArticle); 
router.post('/upload-image/:id', multipartMiddleware, articleController.uploadImage)
router.get('/get-image/:image',articleController.getImageFile)


module.exports=router;