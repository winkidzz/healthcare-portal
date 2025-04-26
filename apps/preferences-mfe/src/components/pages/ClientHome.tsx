'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/router';

export function ClientHome() {
  const router = useRouter();

  useEffect(() => {
    router.push('/preferences');
  }, [router]);

  return null;
} 