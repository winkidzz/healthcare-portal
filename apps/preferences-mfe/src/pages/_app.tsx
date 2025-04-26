import type { AppProps } from 'next/app';
import { StrictMode } from 'react';
import { AuthProvider } from '@healthcare-portal/shared-library';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StrictMode>
      <AuthProvider value={{ user: null, isLoading: false, error: null }}>
        <Component {...pageProps} />
      </AuthProvider>
    </StrictMode>
  );
} 