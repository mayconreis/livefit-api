'use strict';

const { DataType } = require('sequelize-typescript');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.createTable('routines', {
      id: {
        type: DataType.INTEGER(),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      patient_Id: {
        type: DataType.INTEGER(),
        references: { model: 'users', key: 'id' },
      },
      nutritionist_id: {
        type: DataType.INTEGER(),
        references: { model: 'users', key: 'id' },
      },
    });
  },

  async down(queryInterface) {
    return queryInterface.dropTable('routines');
  },
};
