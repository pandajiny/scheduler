import { config } from 'dotenv';

import * as session from 'express-session';
import * as redisConnect from 'connect-redis';
import * as redis from 'redis';
config();

export const API_PORT = getEnv('API_PORT');
export const DB_HOST = getEnv('DB_HOST');
export const DB_PORT = getEnv('DB_PORT');
export const DB_PASSWORD = getEnv('DB_PASSWORD');

const REDIS_HOST = getEnv('REDIS_HOST');
const REDIS_PORT = getEnv('REDIS_PORT');

const RedisStore = redisConnect(session);
const redisClient = redis.createClient({
  host: REDIS_HOST,
  port: parseInt(REDIS_PORT),
});
export const sessionOptions: session.SessionOptions = {
  secret: `secret`,
  saveUninitialized: true,
  resave: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    domain: process.env.NODE_ENV?.includes('dev')
      ? undefined
      : '.pandajiny.com',
  },
  store: new RedisStore({
    port: 4379,
    client: redisClient,
    ttl: 86400,
  }),
};

const FRONTEND_URL = getEnv('FRONTEND_URL');
export const corsOptions = {
  credentials: true,
  origin: FRONTEND_URL,
};

export const KEY_PATH = getEnv('KEY_PATH');
export const CERT_PATH = getEnv('CERT_PATH');

function getEnv(key: string) {
  if (
    process.env.NODE_ENV?.includes('dev') &&
    (key.includes('PORT') || key.includes('HOST') || key.includes('URL'))
  ) {
    key += '_LOCAL';
  }

  const value = process.env[key];
  if (!value) {
    console.error(`Cannot parse env ${key}`);
    throw new Error(`Cannot parse env value`);
  }
  return value;
}
