'use client';
import dynamic from 'next/dynamic';

const ICDTestsApp = dynamic(() => import('icd_tests_mfe/ICDTests'), { ssr: false });

export default function ICDTestsPage() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <ICDTestsApp />
    </div>
  );
} 