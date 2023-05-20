'use strict';

const { DataType } = require('sequelize-typescript');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.createTable('meal_items', {
      id: {
        type: DataType.INTEGER(),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      item: {
        type: DataType.STRING(),
        allowNull: false,
      },
      quantity: {
        type: DataType.STRING(),
        allowNull: false,
      },
      meal_option_id: {
        type: DataType.INTEGER(),
        references: { model: 'meal_options', key: 'id' },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
    });
  },

  async down(queryInterface) {
    return queryInterface.dropTable('meal_items');
  },
};
