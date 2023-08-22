const { sequelize, DataTypes } = require('../db.config');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  emailVerifiedAt: {
    type: DataTypes.STRING, // Adjust the data type as needed
    unique: true,
  },
  rememberToken: {
    type: DataTypes.STRING,
    unique: true,
  },
  level: {
    type: DataTypes.ENUM('USER', 'ADMIN', 'MODERATOR'), // Define the possible values
    defaultValue: 'USER',
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    onUpdate: sequelize.literal('CURRENT_TIMESTAMP'),
  },
});

module.exports = User;