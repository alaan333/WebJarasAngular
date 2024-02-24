'use strict'

var User=require('../models/user')
const sendMail=require('../config/mailer');
const {getToken, getTokenData}=require('../config/jwtoken');

var controller={
    sendEmail:async(req,res)=>{
        var params=req.body
        const token=getToken(params.email);
        var email=params.email
        const verify=await User.findOne({email})
        if (verify!=null) return res.status(500).send({message:'No se pudo guardar el usuario'});
        else{
            sendMail(params.email,params.name,token)
            return res.status(200).send()
        }
    },

    saveUser:async(req,res)=>{     //never (res,req)
        
        var user=new User();
        var params=req.body;

        user.name=params.name;
        user.surname=params.surname;
        user.email=params.email;
        user.password=params.password;
        user.cart=[];

        await user.save((err,userStored)=>{
                if(err && err.code!=11000)  res.status(500).send({message:'Error al guardar usuario'});
                if(!userStored) return res.status(404).send({message:'No se pudo guardar el usuario'});
               
                return res.status(200).send({user:userStored}); 
        })
    },

    confirm:async(req,res)=>{
        const {token}=req.params;
        var control=true;
        const data = getTokenData(token);
        if (data==null){
            console.log('Data nula, token falso o vencido');
            res.status(500).send({message:'Data nula, token falso o vencido'});
            control=false
        }
        else {
            console.log('Confirmacion valida '); 
            return res.status(200).send(control)
        }

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