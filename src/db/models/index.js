'use strict';
const Sequelize = require('sequelize');
const config = require('../config.js');
const db = {};
const sequelize = new Sequelize(config);

const models = [
  require('./Usuario')(sequelize, Sequelize),
  require('./Etapa')(sequelize, Sequelize),
  require('./Ordem')(sequelize, Sequelize),
]
models.forEach(model => {
  db[model.name] = model
})

models.forEach(model => {
  if (db[model.name].associate) {
    db[model.name].associate(db)
  }
})
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
