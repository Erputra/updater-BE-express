'use strict';
const { sequelize } = require('../config/config.json')['development'];

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      emailVerifiedAt: {
        type: Sequelize.STRING, // Adjust the data type as needed
        unique: true,
      },
      rememberToken: {
        type: Sequelize.STRING,
        unique: true,
      },
      level: {
        type: Sequelize.ENUM('USER', 'ADMIN', 'MODERATOR'), // Define the possible values
        defaultValue: 'USER',
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        onUpdate: Sequelize.NOW,
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
