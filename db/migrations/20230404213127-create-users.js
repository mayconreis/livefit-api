'use strict';

const { DataType } = require('sequelize-typescript');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.createTable('users', {
      id: {
        type: DataType.INTEGER(),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      full_name: {
        type: DataType.STRING(250),
        allowNull: false,
      },
      email: {
        type: DataType.STRING(100),
        allowNull: false,
      },
      profile: {
        type: DataType.STRING,
        allowNull: false,
      },
      password: {
        type: DataType.STRING(),
        allowNull: false,
      },
      personal_key: {
        type: DataType.STRING(),
        allowNull: false,
      },
      created_at: {
        type: DataType.DATE(),
        defaultValue: DataType.NOW,
      },
      updated_at: {
        type: DataType.DATE(),
      },
    });
  },

  async down(queryInterface) {
    return queryInterface.dropTable('users');
  },
};
