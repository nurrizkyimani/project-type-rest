import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { Logger } from '@nestjs/common';
import { Connection, getConnection } from 'typeorm';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import { ConfigService } from '@nestjs/config';

const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);

  const adminConfig: ServiceAccount = {
    projectId: configService.get<string>('FIREBASE_PROJECT_ID'),
    privateKey: configService
      .get<string>('FIREBASE_PRIVATE_KEY')
      .replace(/\\n/g, '\n'),
    clientEmail: configService.get<string>('FIREBASE_CLIENT_EMAIL'),
  };

  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
    // credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://type-rest.firebaseio.com',
  });

  app.enableCors();
  await app.listen(port);

  const connection = getConnection();
  const isConnected: boolean = connection.isConnected;

  Logger.log(`Server start on ${port}`, `PORT`);
  Logger.log(`Database is connected ? ${isConnected}`, `DatabaseConnect`);
}
bootstrap();
