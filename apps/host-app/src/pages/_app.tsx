import type { AppProps } from 'next/app';
import { AppProvider } from '@healthcare-portal/shared-library';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
} 