import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import environment from '@src/config/environment';
import models from '@src/database/modelsMapping';
import DatabaseConnection from '@src/database/DatabaseConnection';

class DatabaseSetup {
  private static instance: DatabaseSetup;

  connection!: Sequelize;

  static getInstance(): DatabaseSetup {
    if (!this.instance) {
      this.instance = new DatabaseSetup();
    }

    return this.instance;
  }

  async start(): Promise<void> {
    const connOptions: SequelizeOptions = environment.databases.livefit;

    const sequelize = new DatabaseConnection({ ...connOptions }, models);

    await sequelize.init();
    this.connection = sequelize.connection;
  }

  async stop(): Promise<void> {
    await this.connection.close();
  }
}

export const databaseSetup = DatabaseSetup.getInstance();

export const connection = () => {
  const instance = DatabaseSetup.getInstance();
  return instance.connection;
};
