import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';

const GLOBAL_PREFIX = 'api';
const VERSION = 'v1';

async function bootstrap() {
  const logger = new Logger('Main - Gateway');
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(`${GLOBAL_PREFIX}/${VERSION}`);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(envs.port);

  logger.log(`Gateway running on port: ${envs.port}`);
}
bootstrap();
