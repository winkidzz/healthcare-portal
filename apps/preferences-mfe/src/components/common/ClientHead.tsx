'use client';

import Head from 'next/head';
import type { FC } from 'react';

interface ClientHeadProps {
  children?: React.ReactNode;
}

export const ClientHead: FC<ClientHeadProps> = ({ children }) => {
  return (
    <Head>
      <title>Healthcare Portal - Preferences</title>
      <meta name="description" content="Manage your healthcare preferences" />
      <meta name="keywords" content="healthcare, preferences, settings, medical" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow" />
      {children}
    </Head>
  );
}; 