import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as fs from 'fs';
import {
  API_PORT,
  CERT_PATH,
  corsOptions,
  KEY_PATH,
  sessionOptions,
} from './constants';
import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface';

async function bootstrap() {
  const httpsOptions: HttpsOptions | undefined = isCertExist()
    ? {
        key: fs.readFileSync(KEY_PATH),
        cert: fs.readFileSync(CERT_PATH),
      }
    : undefined;

  if (httpsOptions) {
    console.log(`run https server`);
  } else {
    console.log(`run http server`);
  }
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });
  app.enableCors(corsOptions);
  app.use(session(sessionOptions));

  await app.listen(API_PORT);
  const serverUrl = await app.getUrl();
  console.log(`scheduler api is running on ${serverUrl}`);
}

const isCertExist = (): boolean => {
  return fs.existsSync(KEY_PATH) && fs.existsSync(CERT_PATH);
};

bootstrap();
