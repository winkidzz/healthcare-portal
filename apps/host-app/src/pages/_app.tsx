import type { AppProps } from 'next/app';
import { AuthProvider } from '@healthcare-portal/shared-library';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider value={{ user: null, isLoading: false, error: null }}>
      <Component {...pageProps} />
    </AuthProvider>
  );
} 