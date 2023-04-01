import { createLogger, format, transports, Logger as WinstonLogger } from 'winston';
import environment from '@src/config/environment';

class Logger {
  private logger: WinstonLogger;

  private readonly loggingLevel: string;

  constructor() {
    this.loggingLevel = environment.log.level;

    this.logger = createLogger({
      exitOnError: false,
      format: format.combine(format.json()),
      transports: [
        new transports.Console({
          level: this.loggingLevel,
        }),
      ],
      exceptionHandlers: [
        new transports.Console({
          level: 'error',
        }),
      ],
    });
  }

  public Debug<T>(message: string, object?: T): void {
    this.logger.debug(message, object);
  }

  public Info<T>(message: string, object?: T): void {
    this.logger.info(message, object);
  }

  public Warning<T>(message: string, object?: T): void {
    this.logger.warn(message, object);
  }

  public Error<T>(message: string, object?: T): void {
    this.logger.error(message, object);
  }
}

export default new Logger();
