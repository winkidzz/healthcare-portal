'use client';

import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import '@/styles/globals.css';

const ClientProviders = dynamic(
  () => import('@/providers/ClientProviders').then(mod => mod.ClientProviders),
  { ssr: false }
);

const ClientHead = dynamic(
  () => import('@/components/common/ClientHead').then(mod => mod.ClientHead),
  { ssr: false }
);

function AppWrapper({ Component, pageProps }: AppProps) {
  // Only initialize hooks on the client side
  if (typeof window === 'undefined') {
    return null;
  }

  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <ClientHead />
      <ClientProviders>
        <Component {...pageProps} />
      </ClientProviders>
    </>
  );
}

export default AppWrapper; 