import winston from 'winston';
import { NextRequest, NextResponse } from 'next/server';

// Create logs directory if it doesn't exist
const fs = require('fs');
const path = require('path');

const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Define log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6
};

// Define log colors
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  verbose: 'cyan',
  debug: 'blue',
  silly: 'gray'
};

winston.addColors(colors);

// Create the logger
const logger = winston.createLogger({
  levels,
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: 'preferences-mfe' },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(
          ({ timestamp, level, message, ...meta }) => 
            `${timestamp} [${level}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta) : ''}`
        )
      )
    }),
    new winston.transports.File({ 
      filename: path.join(logsDir, 'error.log'), 
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      )
    }),
    new winston.transports.File({ 
      filename: path.join(logsDir, 'combined.log'),
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      )
    })
  ]
});

// Request logging middleware for Next.js
export const requestLogger = (request: NextRequest) => {
  const logData = {
    method: request.method,
    url: request.url,
    headers: Object.fromEntries(request.headers.entries()),
    timestamp: new Date().toISOString()
  };
  console.log('[Request]', JSON.stringify(logData, null, 2));
};

// Error logging utility
export const errorLogger = (error: Error, context?: Record<string, any>) => {
  const logData = {
    error: error.message,
    stack: error.stack,
    context,
    timestamp: new Date().toISOString()
  };
  console.error('[Error]', JSON.stringify(logData, null, 2));
};

// API response logger
export const responseLogger = (response: NextResponse) => {
  const logData = {
    status: response.status,
    statusText: response.statusText,
    headers: Object.fromEntries(response.headers.entries()),
    timestamp: new Date().toISOString()
  };
  console.log('[Response]', JSON.stringify(logData, null, 2));
};

// Export a simple logging function for general use
export const log = {
  error: (message: string, meta?: any) => logger.error(message, meta),
  warn: (message: string, meta?: any) => logger.warn(message, meta),
  info: (message: string, meta?: any) => logger.info(message, meta),
  debug: (message: string, meta?: any) => logger.debug(message, meta),
  http: (message: string, meta?: any) => logger.http(message, meta)
};

export default logger; 