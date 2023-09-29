import winston, { format, transports } from 'winston';
import config from '../config';
const { combine, printf } = format;

const formatOptions: {
  format: winston.Logform.Format;
} = {
  format: combine(
    config.ENV !== 'production' ? format.simple() : format.json(),

    printf(({ level, message }) => {
      const today = new Date();
      const timestamp = `${
        today.toISOString().split('T')[0]
      } ${today.toLocaleTimeString()}`;

      return `${timestamp} ${level}: ${message}`;
    })
  )
};

const logger: winston.Logger = winston.createLogger({
  ...formatOptions,
  transports: [
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to console
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.Console({ level: 'info' })
  ]
});

export default {
  error(error: { code?: string; stack: string; message: string }) {
    return logger.log('error', error.message);
  },
  info(msg: string) {
    return logger.log('info', msg);
  },
  debug(msg: string) {
    return logger.log('debug', msg);
  },
  warn(msg: string) {
    return logger.log('warn', msg);
  }
};
