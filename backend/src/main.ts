import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as redisConnect from 'connect-redis';
import * as redis from 'redis';
import * as cors from 'cors';
import { FRONTEND_URL } from './constants';

const RedisStore = redisConnect(session);
const redisClient = redis.createClient({
  host: 'localhost',
  port: 6379,
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: FRONTEND_URL,
  });
  app.use(
    session({
      secret: `secret`,
      saveUninitialized: true,
      resave: false,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000,
      },
      store: new RedisStore({
        port: 4379,
        client: redisClient,
        ttl: 86400,
      }),
    }),
  );
  const port = process.env.API_PORT;
  if (!port) {
    throw `Cannot parse PORT env`;
  }
  await app.listen(port);
  const serverUrl = await app.getUrl();
  console.log(`scheduler api is running on ${serverUrl}`);
}

bootstrap();
