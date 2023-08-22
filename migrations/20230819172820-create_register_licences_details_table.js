'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('RegisterLicencesDetails', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      licenceNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      generatedDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('ACTIVE', 'INACTIVE'),
      },
      expirationDate: {
        type: Sequelize.DATE,
      },
      processorSN: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      moboSN: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      harddiskSN: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      createdBy: {
        type: Sequelize.STRING,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedBy: {
        type: Sequelize.STRING,
      },
      registerLicencesId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'RegisterLicences',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('RegisterLicencesDetails');
  },
};
