import { config } from 'dotenv';
config();

export const FRONTEND_URL = getEnv('FRONTEND_URL');
export const DB_HOST = getEnv('DB_HOST');
export const DB_PORT = getEnv('DB_PORT');
export const DB_PASSWORD = getEnv('DB_PASSWORD');

export const REDIS_HOST = getEnv('REDIS_HOST');
export const REDIS_PORT = getEnv('REDIS_PORT');

function getEnv(key: string) {
  if (
    process.env.NODE_ENV?.includes('dev') &&
    (key.includes('PORT') || key.includes('HOST') || key.includes('URL'))
  ) {
    key += '_LOCAL';
  }

  const value = process.env[key];
  if (!value) {
    throw `Cannot parse env ${key}`;
  }
  return value;
}
