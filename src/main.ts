import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import type { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
    cors: true
  });
  app.useBodyParser('json');
  app.enableCors();
  app.use(cookieParser())
  await app.listen(5000);
}
bootstrap();
