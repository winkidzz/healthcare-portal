'use client';

import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import '@/styles/globals.css';

const ClientProviders = dynamic(
  () => import('@/providers/ClientProviders').then(mod => mod.ClientProviders),
  { ssr: false }
);

const ClientHead = dynamic(
  () => import('@/components/common/ClientHead').then(mod => mod.ClientHead),
  { ssr: false }
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ClientHead />
      <ClientProviders>
        <Component {...pageProps} />
      </ClientProviders>
    </>
  );
} 