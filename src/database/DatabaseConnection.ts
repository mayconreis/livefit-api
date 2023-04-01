import { Model, ModelCtor, Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { Logger } from '@src/helpers';

export default class DatabaseConnection {
  connection!: Sequelize;

  private readonly dbConfig: SequelizeOptions;

  private readonly models: ModelCtor<Model>[];

  constructor(dbConfig: SequelizeOptions, models: ModelCtor<Model>[]) {
    this.dbConfig = dbConfig;
    this.models = models;
  }

  async init(): Promise<void> {
    await this.connect();
  }

  private async connect(): Promise<void> {
    this.connection = new Sequelize({
      ...this.dbConfig,
      logging(str: string) {
        Logger.Debug('Query DB', {
          query: str.split('): ')[1],
        });
      },
    });

    this.connection.addModels(this.models);
    await this.connection.authenticate();
    Logger.Info(`Connected with successfully on ${String(this.dbConfig.database)} database...`);
  }
}
