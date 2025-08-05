// src/common/logger.ts
import { createLogger, transports, format } from 'winston';
import * as winston from 'winston';

export const winstonLogger = createLogger({
  level: 'error',
  format: format.combine(
    format.timestamp(),
    // format.colorize({ all: true }),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    }),
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: winston.format.combine(
        winston.format.label({ label: 'fitness_center' }),
        winston.format.json(),
        winston.format.timestamp(),
      ),
    }),
  ],
});
