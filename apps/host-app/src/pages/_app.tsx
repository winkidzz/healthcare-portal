'use client';
import { useEffect } from 'react';
import { AppProps } from 'next/app';
import logger, { log } from '@/utils/logger';
import ErrorBoundary from '@/components/ErrorBoundary';
import '../styles/globals.css';

function useClientSideEffect() {
  useEffect(() => {
    // Log app start
    log.info('Host app started', { status: 'running' });
    
    // Log UI events
    const handleRouteChange = () => {
      log.info('Route changed', {
        path: window.location.pathname,
        component: 'App'
      });
    };

    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      log.info('Host app stopped', { status: 'stopped' });
    };
  }, []);
}

export default function App({ Component, pageProps }: AppProps) {
  // Only run on client side
  if (typeof window !== 'undefined') {
    useClientSideEffect();
  }

  return (
    <ErrorBoundary
      onError={(error, componentStack) => {
        log.error('Unhandled error occurred', {
          error: error.message,
          stack: error.stack,
          componentStack
        });
      }}
    >
      <Component {...pageProps} />
    </ErrorBoundary>
  );
} 