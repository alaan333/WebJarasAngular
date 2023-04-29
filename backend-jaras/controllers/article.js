'use strict'

const article = require('../models-articles/article');
var Article=require('../models-articles/article')
var fs=require('fs')
var path=require('path')

var controller={

    home:function(req,res){
        return res.status(200).send({
            message:'Home'
        });        
    },
    
    test:function(req,res){
        return res.status(200).send({
            message:'Test'
        });        
    },

    //Guardar articulo en la base de datos
    saveArticle:(req,res)=>{
        var article=new Article();
        var params=req.body;

        article.category=params.category;      
        article.typeArticle=params.typeArticle;
        article.size=params.size;
        article.season=params.season;
        article.color=params.color;
        article.image=null;
        article.description=params.description;
        article.code=params.code;
        article.price=params.price;
        article.offsale=params.offsale;

        article.save((err,articleStored)=>{
            if(err){
                return res.status(500).send({
                    message:'Error al guardar'
                })
            }
            if(!articleStored){
                return res.status(404).send({
                    message:'No se pudo guardar el articulo'
                })
            }
            return res.status(200).send({
                article:articleStored
            })
        })
    },

    //Obtener articulo de la base de datos
    getArticle:(req,res)=>{
        var articleId=req.params.id;
    
        if(articleId==null){return res.status(404).send({
            message:'No se encontro el articulo'
        })}
        else{
            Article.findById(articleId,(err,article)=>{
                if(err){
                    return res.status(500).send({
                        message:'Error al devolver datos'
                    })
                };
                if(!article){
                    return res.status(404).send({
                        message:'No se encontro el articulo'
                    })
                };
    
                return res.status(200).send({
                    article
                })
            })
        }

    },

    getAllArticles:(req,res)=>{
        //Article.find({category: 'prenda inferior'}).exec((err,articles)=>{   // si queremos que haga un listado con alguna condicion, colocamos la condicion dentro de {}
        Article.find({}).exec((err,articles)=>{
            if(err){
                return res.status(500).send({
                    message:'Error al devolver datos'
                })
            };
            if(!articles){
                return res.status(404).send({
                    message:'No hay ningun articulo'
                })
            };

            return res.status(200).send({
                articles
            })
        })
    },

    //Modificar articulo
    updateArticle:(req,res)=>{
        var articleId=req.params.id;
        var update=req.body;
        
        Article.findByIdAndUpdate(articleId,update,(err,articleUpdated)=>{
            if(err){
                return res.status(500).send({
                    message:'Error al actualizar'
                });
            };
            if(!articleUpdated){
                return res.status(404).send({
                    message:'No se encontro el articulo'
                })
            };

            return res.status(200).send({
                article:articleUpdated
            })
        })
    },

    daleteArticle:(req,res)=>{
        var articleId=req.params.id;

        Article.findByIdAndDelete(articleId,(err,articleDeleted)=>{
            if(err){
                return res.status(500).send({
                    message:'Error al borrar'
                });
            };
            if(!articleDeleted){
                return res.status(404).send({
                    message:'No se encontro el articulo'
                })
            };

            return res.status(200).send({
                article:articleDeleted
            })
        })
    },

    uploadImage:(req,res)=>{
        var articleId=req.params.id;
        var fileName='Sin imagen';

        if(req.files){
            var filePath=req.files.image.path;
            var fileSplit=filePath.split('\\')
            var fileName=fileSplit[1];
            var extSplit=fileName.split('.');
            var fileExt=extSplit[1];

            if(fileExt=='png' || fileExt=='jpg' || fileExt=='jpeg'){
                Article.findByIdAndUpdate(articleId, {image:fileName},(err,articleUpdated)=>{
                
                    if(err){
                        return req.status(500).send({
                            message:'La imagen no se subió'
                        })
                    }
                    if(!articleUpdated){
                        return req.status(404).send({
                            message:'No se encontro el articulo para la imagen'
                        })
                    }
    
                    return res.status(200).send({
                        article:articleUpdated
                    })
                })
            }
            else{                                           //<---para que el archivo no quede guardado en uploads
                fs.unlink(filePath,(err)=>{
                    return res.status(200).send({
                        message:'El formato del archivo no es valido'
                    });
                })
            }
        }
        else{
            return res.status(200).send({
                message:fileName
            })
        }
    },

    getImageFile:function(req,res){
        var file=req.params.image;
        var path_file='./uploads/'+file
        fs.exists(path_file,(exists)=>{
            if(exists){
                return res.sendFile(path.resolve(path_file))
            }
            else{
                return res.status(200).send({
                    message:'No existe la imagen'
                })
            }
        })
    }
};


module.exports=controller;