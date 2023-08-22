const { sequelize, DataTypes } = require('../db.config');

const RegisterLicencesDetails = sequelize.define('RegisterLicencesDetails', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  licenceNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  generatedDate: {
    type: DataTypes.DATE,
  },
  status: {
    type: DataTypes.ENUM('ACTIVE', 'INACTIVE'),
  },
  expirationDate: {
    type: DataTypes.DATE,
  },
  processorSN: {
    type: DataTypes.STRING,
  },
  moboSN: {
    type: DataTypes.STRING,
  },
  harddiskSN: {
    type: DataTypes.STRING,
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

module.exports = RegisterLicencesDetails;