const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const jwtsecret = require('../config/secret')[env];
var createError = require('http-errors');
const db = require('../models');

module.exports = async (req, res, next) => {
  try {
    let tokensession = req.headers.authorization.split(' ')[1];
    if (tokensession) {

      jwt.verify(tokensession, jwtsecret);

      let User = await db.User.findOne({
        include: [
          {
            model: db.Session,
            as: 'Sessions',
            required: true,
            where: {
              tokensession: tokensession
            }
          },
        ]
      })

      if (!User)
        throw Error('Sessão não existe');

      req.User = User;
    }

    next();

  } catch (err) {
    next(createError(401));
  }
};
