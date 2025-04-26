import dynamic from 'next/dynamic';
import type { FC } from 'react';

const ClientHome = dynamic(() => import('@/components/pages/ClientHome').then(mod => mod.ClientHome), {
  ssr: false,
});

const Home: FC = () => {
  return <ClientHome />;
};

export default Home; 