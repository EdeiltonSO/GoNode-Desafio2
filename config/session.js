const session = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const { sequelize } = require('../app/models');

module.exports = {
  secret: 'session-docfy-20180905-0315',
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({ db: sequelize }),
};
