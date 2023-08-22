const fs = require('fs');
const path = require('path');
const { sequelize, DataTypes } = require('../db.config');
const basename = path.basename(__filename);
const db = {};

// Import and populate db object with model functions
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const modelFunction = require(path.join(__dirname, file));
    db[modelFunction.name] = modelFunction; // Store the model function itself
  });

// Require and set up associations
const setupAssociations = require('./association');
setupAssociations();

module.exports = db;
