import { NextRequest, NextResponse } from 'next/server';

type LogLevel = 'error' | 'warn' | 'info' | 'http' | 'debug';

interface LogMeta {
  [key: string]: any;
}

interface Logger {
  error: (message: string, meta?: LogMeta) => void;
  warn: (message: string, meta?: LogMeta) => void;
  info: (message: string, meta?: LogMeta) => void;
  http: (message: string, meta?: LogMeta) => void;
  debug: (message: string, meta?: LogMeta) => void;
}

const formatMessage = (level: LogLevel, message: string, meta?: LogMeta): string => {
  const timestamp = new Date().toISOString();
  const metaStr = meta ? ` ${JSON.stringify(meta)}` : '';
  return `${timestamp} [${level.toUpperCase()}]: ${message}${metaStr}`;
};

const logger: Logger = {
  error: (message: string, meta?: LogMeta) => {
    console.error(formatMessage('error', message, meta));
  },
  warn: (message: string, meta?: LogMeta) => {
    console.warn(formatMessage('warn', message, meta));
  },
  info: (message: string, meta?: LogMeta) => {
    console.info(formatMessage('info', message, meta));
  },
  http: (message: string, meta?: LogMeta) => {
    console.log(formatMessage('http', message, meta));
  },
  debug: (message: string, meta?: LogMeta) => {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(formatMessage('debug', message, meta));
    }
  }
};

// Request logging middleware for Next.js
export const requestLogger = (request: NextRequest) => {
  logger.info('Incoming request', {
    method: request.method,
    url: request.url,
    headers: Object.fromEntries(request.headers.entries())
  });
};

// Error logging utility
export const errorLogger = (error: Error, context?: Record<string, any>) => {
  logger.error('Error occurred', {
    error: error.message,
    stack: error.stack,
    context
  });
};

// API response logger
export const responseLogger = (response: NextResponse) => {
  logger.info('Outgoing response', {
    status: response.status,
    statusText: response.statusText,
    headers: Object.fromEntries(response.headers.entries())
  });
};

// Export a simple logging interface for general use
export const log = logger;

export default logger; 