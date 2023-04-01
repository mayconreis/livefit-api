const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  development: {
    username: process.env.DB_LIVEFIT_USERNAME,
    password: process.env.DB_LIVEFIT_PASSWORD,
    database: process.env.DB_LIVEFIT_DATABASE,
    host: process.env.DB_LIVEFIT_HOST,
    dialect: 'mysql',
    migrationStorageTableName: 'sequelize_meta',
    seederStorageTableName: 'sequelize_data',
    seederStorage: 'sequelize',
  },
  production: {
    username: process.env.DB_LIVEFIT_USERNAME,
    password: process.env.DB_LIVEFIT_PASSWORD,
    database: process.env.DB_LIVEFIT_DATABASE,
    host: process.env.DB_LIVEFIT_HOST,
    dialect: 'mysql',
    migrationStorageTableName: 'sequelize_meta',
    seederStorageTableName: 'sequelize_data',
    seederStorage: 'sequelize',
  },
};
