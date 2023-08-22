const { sequelize, DataTypes } = require('../db.config');

const RegisterLicences = sequelize.define('RegisterLicences', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  registerId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  dateOfFilling: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  poId: {
    type: DataTypes.STRING,
  },
  clientId: {
    type: DataTypes.STRING,
  },
  variant: {
    type: DataTypes.ENUM('FULL', 'TRIAL'),
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  createdBy: {
    type: DataTypes.STRING,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    onUpdate: DataTypes.NOW,
  },
  updatedBy: {
    type: DataTypes.STRING,
  },
});

module.exports = RegisterLicences;