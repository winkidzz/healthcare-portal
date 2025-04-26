'use client';

import dynamic from 'next/dynamic';
import { FC } from 'react';

// Dynamically import the Navigation component with no SSR
const Navigation = dynamic(() => import('./Navigation').then(mod => mod.Navigation), {
  ssr: false,
}) as FC;

const ClientNavigation: FC = () => {
  return <Navigation />;
};

export default ClientNavigation; 