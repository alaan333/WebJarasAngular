'use strict'
var admin={
  email:'jarasboutique0@gmail.com',
  pass:"sfkl xwpe xazn jifq"
}
var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: admin.email,
      pass: admin.pass,
    },
    
  });

const sendMail =  async (mail,name,token) => {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"JarasBoutique 🌸" <jarasboutique0@gmail.com>', // sender address
      to: mail, // list of receivers
      subject: "Confirmación de cuenta 🤗", // Subject line
      text: "Hello world?", // plain text body
      html: `
      <h1>Hola ${name}</h1>
      <h2>Bienvenido a nuestra tienda jaras</h2>
      <h3>Por favor, verificar cuenta</h3>
      <a href="http://localhost:4200/confirmar/${token}">Verificar</a>
      `,
    });
  
    console.log("Message sent: %s", info.messageId);
  };


  module.exports=sendMail

