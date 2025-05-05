'use client';
import dynamic from 'next/dynamic';

const AppLauncher = dynamic(() => import('../components/AppLauncher'), { ssr: false });

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <AppLauncher />
    </div>
  );
} 