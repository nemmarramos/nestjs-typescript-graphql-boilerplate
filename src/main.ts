import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = process.env.port || 3000;
const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
  app.useGlobalPipes(new ValidationPipe());

  logger.log(`Listening to port ${PORT}`);
}

bootstrap();
