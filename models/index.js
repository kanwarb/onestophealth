// enable strict mode
'use strict';
// ES6 syntax, auto generated by sequelize
// global vars def
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
// def env route for production or development
const env = process.env.NODE_ENV || 'development';
// import config.json
const config = require(__dirname + '/../config/config.json')[env];
// empty db object
const db = {};

// init sequelize DB based on config
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// filesystem init
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });
// DB associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
// def sequelize vars for db
db.sequelize = sequelize;
db.Sequelize = Sequelize;
// exports db object for global scope
module.exports = db;
