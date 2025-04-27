import type { AppProps } from 'next/app';
import { AuthProvider } from '@healthcare-portal/shared-library';
import { PreferencesProvider } from '../utils/loadMFEs';
import Navigation from '../components/Navigation';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider value={{ user: null, isLoading: false, error: null }}>
      <PreferencesProvider>
        <div className="min-h-screen bg-gray-100">
          <Navigation />
          <main>
            <Component {...pageProps} />
          </main>
        </div>
      </PreferencesProvider>
    </AuthProvider>
  );
} 