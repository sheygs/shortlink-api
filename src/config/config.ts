import 'dotenv/config';

export default {
  port: process.env.PORT ?? 3000,
  environment: process.env.NODE_ENV ?? 'development'
};