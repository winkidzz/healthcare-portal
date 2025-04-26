import React from 'react';
import Head from 'next/head';
import { metadata } from '@/lib/metadata';

export function ServerHead() {
  return (
    <Head>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta name="keywords" content={metadata.keywords} />
      <meta name="viewport" content={metadata.viewport} />
      <meta name="robots" content={metadata.robots} />
    </Head>
  );
} 