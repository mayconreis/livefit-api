import dotenv from 'dotenv';
import { Dialect } from 'sequelize';

dotenv.config();

export default {
  application: {
    name: process.env.APP_NAME || 'estoque-tech-api',
    port: process.env.PORT || 5003,
    env: process.env.NODE_ENV || 'development',
  },
  log: {
    level: process.env.LOG_LEVEL || 'debug',
  },
  api: {
    serverTimeout: Number(process.env.SERVER_TIMEOUT || 60000),
    requestTimeout: Number(process.env.REQUEST_TIMEOUT || 59000),
  },
  security: {
    secretKey: process.env.SECRET_KEY_JWT,
    expiresToken: process.env.EXPIRES_TOKEN || '10h',
    saltRounds: process.env.SALT_ROUNDS || '10',
  },
  databases: {
    livefit: {
      username: process.env.DB_LIVEFIT_USERNAME,
      password: process.env.DB_LIVEFIT_PASSWORD,
      database: process.env.DB_LIVEFIT_DATABASE,
      host: process.env.DB_LIVEFIT_HOST,
      dialect: 'mysql' as Dialect,
      queryTimeout: Number(process.env.REQUEST_TIMEOUT),
      port: Number(process.env.DB_LIVEFIT_PORT),
      define: {
        timestamps: true,
        underscoded: true,
        underscodedAll: true,
      },
      timezone: '-03:00',
    },
  },
};
