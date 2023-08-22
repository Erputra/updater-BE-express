const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(   
    'db_mod_updater_expres',
    'root',
    '',
     {
       host: '127.0.0.1',
       dialect: 'mysql'
    }
);

async function connectDB() {
    try {
      await sequelize.authenticate();
      console.log("✅ Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }

module.exports = { sequelize, Sequelize, DataTypes, connectDB };