import * as dotenv from 'dotenv';

dotenv.config();

type NodeEnvironment = 'development' | 'production' | 'test';

interface Variables {
  PORT: number;
  NODE_ENV: NodeEnvironment;

  FIREBASE_API_KEY?: string;
  FIREBASE_AUTH_DOMAIN?: string;
  FIREBASE_DATABASE_URL?: string;
  FIREBASE_PROJECT_ID?: string;
  FIREBASE_STORAGE_BUCKET?: string;
  FIREBASE_MESSEGING_SENDER_ID?: string;
  FIREBASE_APP_ID?: string;
  FIREBASE_MEASUREMENT_ID?: string;

  SECRET_OR_KEY?: string;
  JWT_SECRET?: string;

  REDIS_PORT?: number;
  REDIS_HOST?: string;
  REDIS_PASSWORD?: number;
  REDIS_CACHE_EXPIRY?: number;
  REDIS_HOST_IP_FAMILY?: number;

  EMAIL_SERVICE?: string;
  EMAIL?: string;
  EMAIL_PASSWORD?: string;
  FEEDBACK_MAIL?: string;

  FRONTEND_URL?: string;
}

export const variables: Variables = {
  PORT: parseInt(process.env.PORT || '3000'),
  NODE_ENV: process.env.NODE_ENV as NodeEnvironment,

  FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSEGING_SENDER_ID: process.env.FIREBASE_MESSEGING_SENDER_ID,
  FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,

  SECRET_OR_KEY: process.env.SECRET_OR_KEY,
  JWT_SECRET: process.env.JWT_SECRET,

  REDIS_PORT: parseInt(process.env.REDIS_PORT as string),
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PASSWORD: parseInt(process.env.REDIS_PASSWORD as string),
  REDIS_CACHE_EXPIRY: parseInt(process.env.REDIS_CACHE_EXPIRY as string),
  REDIS_HOST_IP_FAMILY: parseInt(process.env.REDIS_HOST_IP_FAMILY as string),

  EMAIL_SERVICE: process.env.EMAIL_SERVICE,
  EMAIL: process.env.EMAIL,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,

  FRONTEND_URL: process.env.FRONTEND_URL,
};
