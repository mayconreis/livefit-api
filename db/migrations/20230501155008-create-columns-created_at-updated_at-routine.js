'use strict';

const { DataType } = require('sequelize-typescript');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.addColumn('routines', 'created_at', DataType.DATE);
    return queryInterface.addColumn('routines', 'updated_at', DataType.DATE);
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('routines', 'created_at');
    return queryInterface.removeColumn('routines', 'updated_at');
  },
};
