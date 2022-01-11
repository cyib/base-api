const smtpTransport = require('nodemailer-smtp-transport');
const nodemailer = require('nodemailer');
const mailconfig = require('../../config/mailconfig');
var express = require('express');
var router = express.Router();

router.post('/enviar/:namesite', async function (req, res, next) {
  try {
    var email = mailconfig.email;
    var senha = mailconfig.senha;
    var namesite = (req.params.namesite).toString().toUpperCase();

    var body = req.body;

    var sendTo = "email_to_send_here";

    var transporter = nodemailer.createTransport(smtpTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: email,
        pass: senha
      }
    }));

    var mailOptions = {
      from: email,
      to: email + ',' + sendTo,
      subject: `[${namesite}] Novo formulário de ${body['nome']}`,
      html: ` <h1>[${namesite}] Formulário de Contato</h1>
                    <hr>
                    <p>Nome: `+ body['nome'] + `</p>
                    <p>E-mail: `+ body['email'] + `</p>
                    <p>Assunto: `+ body['assunto'] + `</p>
                    <p>Telefone: `+ body['telefone'] + `</p>
                    <p>Mensagem: `+ body['message'] + `</p>
                    `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.send(error);
        return console.log(error);
      }
      res.send("OK");
      console.log('Mensagem %s enviada: %s', info.messageId, info.response);
    });

  } catch (error) {

  }
});

module.exports = router;