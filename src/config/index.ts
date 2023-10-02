import 'dotenv/config';
import pkg from '../../package.json';

export default {
  PORT: process.env.PORT ?? 8282,
  ENV: process.env.NODE_ENV ?? 'development',
  VERSION: pkg.version,
  VER: `v${pkg.version[0]}`
};
