import 'colors';
import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { errorlogger, logger } from './shared/logger';
import { RedisClient } from './shared/redis';
import subscribeToEvent from './app/events';

process.on('uncaughtException', error => {
  errorlogger.error(error);
  process.exit(1);
});

let server: Server;

async function bootstrap() {
  try {
      // ! for redis ///
    await RedisClient.connect().then(()=>subscribeToEvent())

    await mongoose.connect(config.database_url as string);
    logger.info(`🛢   Database is connected successfully`.yellow.underline.bold);

    server = app.listen(config.port, () => {
      logger.info(
        `Application  listening on port ${config.port}`.green.underline.bold
      );
    });
  } catch (err) {
    errorlogger.error('Failed to connect database', err);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorlogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

bootstrap();

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});
