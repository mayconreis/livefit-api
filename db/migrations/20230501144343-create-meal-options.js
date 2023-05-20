'use strict';

const { DataType } = require('sequelize-typescript');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.createTable('meal_options', {
      id: {
        type: DataType.INTEGER(),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      meal_id: {
        type: DataType.INTEGER(),
        references: { model: 'meals', key: 'id' },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
    });
  },

  async down(queryInterface) {
    return queryInterface.dropTable('meal_options');
  },
};
