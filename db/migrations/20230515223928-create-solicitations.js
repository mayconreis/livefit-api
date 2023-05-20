'use strict';

const { DataType } = require('sequelize-typescript');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.createTable('solicitations', {
      id: {
        type: DataType.INTEGER(),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: DataType.INTEGER(),
        references: { model: 'users', key: 'id' },
      },
      nutritionist_id: {
        type: DataType.INTEGER(),
        references: { model: 'users', key: 'id' },
      },
      solicitation_type: {
        type: DataType.STRING(),
        allowNull: false,
      },
      finished: {
        type: DataType.BOOLEAN(),
        defaultValue: false,
      },
      created_at: {
        type: DataType.DATE(),
      },
      updated_at: {
        type: DataType.DATE(),
      },
    });
  },

  async down(queryInterface) {
    return queryInterface.dropTable('solicitations');
  },
};
