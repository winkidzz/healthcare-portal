import type { AppProps } from 'next/app';
import { StrictMode } from 'react';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StrictMode>
      <Component {...pageProps} />
    </StrictMode>
  );
} 