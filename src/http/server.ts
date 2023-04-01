import { Logger } from '@src/helpers';
import environment from '@src/config/environment';
import App from './app';

const app = new App();

app
  .bootstrap()
  .then(() => {
    Logger.Info(`🚀 Server started on port ${environment.application.port}!`);
    Logger.Info(`See health in http://localhost:${environment.application.port}/health`);
  })
  .catch((err) => Logger.Error(`Error`, err));
