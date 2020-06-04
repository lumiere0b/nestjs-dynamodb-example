import { APIGatewayProxyHandler } from 'aws-lambda';
import { createServer, proxy } from 'aws-serverless-express';
import * as express from 'express';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { Server } from 'http';

import { AppModule } from './app.module';

async function bootstrapServer(): Promise<Server> {
  const expressApp = express();
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(expressApp));
  app.set('x-powered-by', false);
  app.set('trust proxy', true);
  app.enableCors({ origin: true, credentials: true });
  app.init();
  return createServer(expressApp);
}

let server: Server;
export const handler: APIGatewayProxyHandler = (event, context) => {
  Promise.resolve()
    .then(async () => server = server || await bootstrapServer())
    .then((server) => proxy(server, event, context));
};
