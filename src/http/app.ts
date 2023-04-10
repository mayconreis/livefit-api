import cors from 'cors';
import * as http from 'http';
import express from 'express';
import 'express-async-errors';
import healthRoutes from '@src/http/routes/healthRoutes';
import routersV1 from '@src/http/routes/masterRoutes';
import environment from '@src/config/environment';
import { databaseSetup } from '@src/database/DatabaseSetup';
import errorHandler from '@src/http/middlewares/errorHandler';
import dotenv from 'dotenv';

dotenv.config();

export default class App {
  public server!: http.Server;

  private readonly app: express.Application;

  constructor() {
    this.app = express();
  }

  async bootstrap(): Promise<express.Application> {
    await this.initDatabase();
    return this.init();
  }

  async shutDown(): Promise<void> {
    await new Promise<void>((resolve) => {
      this.stopDatabase();
      this.server.close();
      resolve();
    });
  }

  private init(): Promise<express.Application> {
    return new Promise((resolve, reject) => {
      try {
        this.app.use(cors());
        this.app.use(express.json());

        this.app.use('/health', healthRoutes);
        this.app.use('/api', routersV1);

        this.app.use(errorHandler);

        const { port } = environment.application;

        this.server = this.app.listen(port, () => resolve(this.app));
        this.server.timeout = environment.api.serverTimeout;
      } catch (err) {
        reject(err);
      }
    });
  }

  private async initDatabase(): Promise<void> {
    await databaseSetup.start();
  }

  private async stopDatabase(): Promise<void> {
    await databaseSetup.stop();
  }
}
