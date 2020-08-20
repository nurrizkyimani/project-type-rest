import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { Logger } from '@nestjs/common';
import { Connection, getConnection } from 'typeorm';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

const serviceAccount = require('../serviceAccountKey.json');

const port = process.env.PORT || 3000;

async function bootstrap() {
	admin.initializeApp({
		// credential: admin.credential.cert({
		// 	clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
		// 	privateKey: process.env.FIREBASE_PRIVATE_KEY,
		// 	projectId: process.env.FIREBASE_PROJECT_ID
		// }),
		credential: admin.credential.cert(serviceAccount),
		databaseURL: 'https://type-rest.firebaseio.com'
	});

	const app = await NestFactory.create(AppModule);

	app.enableCors();
	await app.listen(port);

	const connection = getConnection();
	const isConnected: boolean = connection.isConnected;

	Logger.log(`Server start on ${port}`, `PORT`);
	Logger.log(`Database is connected ? ${isConnected}`, `DatabaseConnect`);
}
bootstrap();
