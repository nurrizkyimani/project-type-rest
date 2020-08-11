import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { Logger } from '@nestjs/common';
import { Connection, getConnection } from 'typeorm';

const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);

  const connection = getConnection();
  const isConnected: boolean = connection.isConnected;

  Logger.log(`Server start on ${port}`, `PORT`);
  Logger.log(`Database is connected ? ${isConnected}`, `DatabaseConnect`);
}
bootstrap();
