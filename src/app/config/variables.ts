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

  JWT_SECRET?: string;

  REDIS_PORT?: number;
  REDIS_HOST?: string;
  REDIS_PASSWORD?: number;
  REDIS_CACHE_EXPIRY?: number;
  REDIS_HOST_IP_FAMILY?: number;

  SENDGRID_API_KEY: string;
  EMAIL_SERVICE?: string;
  EMAIL: string;
  EMAIL_PASSWORD?: string;
  FEEDBACK_MAIL?: string;

  FRONTEND_URL?: string;

  GOOGLE_CLIENT_ID?: string;
  GOOGLE_CLIENT_SECRET?: string;
}

export const variables: Variables = {
  PORT: +(process.env.PORT || '3000'),
  NODE_ENV: process.env.NODE_ENV as NodeEnvironment,

  FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSEGING_SENDER_ID: process.env.FIREBASE_MESSEGING_SENDER_ID,
  FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,

  JWT_SECRET: process.env.JWT_SECRET,

  REDIS_PORT: +(process.env.REDIS_PORT as string),
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PASSWORD: +(process.env.REDIS_PASSWORD as string),
  REDIS_CACHE_EXPIRY: +(process.env.REDIS_CACHE_EXPIRY as string),
  REDIS_HOST_IP_FAMILY: +(process.env.REDIS_HOST_IP_FAMILY as string),

  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY || '',
  EMAIL_SERVICE: process.env.EMAIL_SERVICE,
  EMAIL: process.env.EMAIL || '',
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  FEEDBACK_MAIL: process.env.FEEDBACK_MAIL,

  FRONTEND_URL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : process.env.FRONTEND_URL,

  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
};
