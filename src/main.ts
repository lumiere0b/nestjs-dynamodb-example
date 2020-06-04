import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';
import environment from './environment';
import { GlobalExceptionFilter } from './global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.set('x-powered-by', false);
  app.set('trust proxy', true);
  app.enableCors({ origin: true, credentials: true });
  app.useGlobalFilters(new GlobalExceptionFilter(httpAdapter));
  await app.listen(environment.PORT);
}
bootstrap();
