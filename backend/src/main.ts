import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import { CERT_PATH, KEY_PATH } from './secret/secrets';

const HTTP_PORT = 80;
const HTTPS_PORT = 443;

async function startWithHttp() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  console.log(`cors enabled`);
  await app.listen(HTTP_PORT);
  const serverUrl = await app.getUrl();
  console.log(`server is listening on ${serverUrl}`);
}

async function startWithHttps() {
  const httpsOptions = {
    key: fs.readFileSync(KEY_PATH),
    cert: fs.readFileSync(CERT_PATH),
  };
  const app = await NestFactory.create(AppModule, { httpsOptions });

  app.enableCors();
  console.log(`cors enabled`);

  await app.listen(HTTPS_PORT).catch(err => {
    throw err;
  });

  const serverUrl = await app.getUrl();
  console.log(`server is listening on  ${serverUrl}`);
}

// if (isFileExists([KEY_PATH, CERT_PATH])) {
//   console.log(`server updated`);
//   console.log(`cert exist, start https server`);
//   startWithHttps();
// } else {
//   console.log(`cert not exist, start http server`);
//   startWithHttp();
// }

function isFileExists(paths: string[]): boolean {
  return paths.every(path => fs.existsSync(path));
}

startWithHttp();
