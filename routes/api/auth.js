var createError = require('http-errors');
var express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtsecret = require('../../config/secret')[process.env.NODE_ENV || 'development'];
const db = require('../../models');
var router = express.Router();

router.post('/user/login', async function (req, res, next) {
    try {
        const loginBody = req.body;
        let tokenJWT;
        let User;

        if (loginBody.email && loginBody.password) {
            User = await db.User.findOne({
                where: {
                    email: loginBody.email
                }
            });

            if (!User) throw Error('Usuário não encontrado ou senha inválida');

            let isValidPassword = await bcrypt.compare(loginBody.password, User.password);
            if (isValidPassword) {
                tokenJWT = jwt.sign({ email: loginBody.email }, jwtsecret, { issuer: 'VAM' });
            }
            else {
                throw Error('Usuário não encontrado ou senha inválida');
            }
        }

        await db.Session.create({
            tokensession: tokenJWT,
            UserId: User.id,
        })

        var userMapper = {
            avatar: User.avatar,
            email: User.email,
            name: User.name,
            id: User.id,
        }

        res.status(200).send({
            message: 'Usuário logado com sucesso',
            User: userMapper,
            tokenJWT: tokenJWT
        });

    } catch (error) {
        res.status(400).send({
            message: error.message,
        });
    }
});

module.exports = router;
