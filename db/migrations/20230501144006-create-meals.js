'use strict';

const { DataType } = require('sequelize-typescript');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.createTable('meals', {
      id: {
        type: DataType.INTEGER(),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      time: {
        type: DataType.STRING(),
        allowNull: false,
      },
      period: {
        type: DataType.STRING(),
        allowNull: false,
      },
      routine_id: {
        type: DataType.INTEGER(),
        references: { model: 'routines', key: 'id' },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
    });
  },

  async down(queryInterface) {
    return queryInterface.dropTable('meals');
  },
};
