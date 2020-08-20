import * as functions from 'firebase-functions';
import * as express from 'express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';

const server = express();
export const createNestServer = async (expressInstance) => {
	const app = await NestFactory.create(AppModule, new ExpressAdapter(expressInstance));

	return app.init();
};

createNestServer(server).then((v) => console.log('Nest Ready')).catch((err) => console.log('Nest broken', err));

export const api = functions.https.onRequest(server);
