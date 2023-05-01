'use strict';

const { DataType } = require('sequelize-typescript');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.addColumn('users', 'nutritionist_id', DataType.INTEGER);
  },

  async down(queryInterface) {
    return queryInterface.removeColumn('users', 'nutritionist_id');
  },
};
