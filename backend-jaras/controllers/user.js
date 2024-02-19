'use strict'

var User=require('../models/user')

var controller={

    saveUser:function(req,res){     //never (res,req) 
        var user=new User();
        var params=req.body;

        user.name=params.name;
        user.surname=params.surname;
        user.email=params.email;
        user.password=params.password;
        user.cart=[];

        user.save((err,userStored)=>{
            if(err) res.status(500).send({message:'Error al guardar usuario'});
            if(!userStored) return res.status(404).send({message:'No se pudo guardar el usuario'});

            return res.status(200).send({user:userStored});
        })
    },

    getUser:(req,res)=>{
        var userId=req.params.id;
    
        if(userId==null){return res.status(404).send({
            message:'No se encontro el articulo'
        })}
        else{
            User.findById(userId,(err,user)=>{  //findById searches objet on database with its id
                if(err){
                    return res.status(500).send({
                        message:'Error al devolver datos'
                    })
                };
                if(!user){
                    return res.status(404).send({
                        message:'No se encontro el usuario'
                    })
                };
    
                return res.status(200).send({
                    user
                })
            })
        }

    },

    getUsers: function(req,res){

        User.find({}).exec((err,users)=>{
            if(err) return res.status(500).send({message:'Error al devolver usuariso'});
            if(!users) return res.status(404).send({message: 'No hay usuarios'})

            return res.status(200).send({users})
        });
    },

    //Modificar usuario
    updateUser:(req,res)=>{
        var userId=req.params.id;
        var update=req.body;
        
        User.findByIdAndUpdate(userId,update,(err,userUpdated)=>{
            if(err){
                return res.status(500).send({
                    message:'Error al actualizar'
                });
            };
            if(!userUpdated){
                return res.status(404).send({
                    message:'No se encontro el usuario'
                })
            };

            return res.status(200).send({
                user:userUpdated
            })
        })
    },

}

module.exports=controller;