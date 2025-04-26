import React from 'react';
import dynamic from 'next/dynamic';

const Preferences = dynamic(() => import('preferences/Preferences').then(mod => mod.default), {
  ssr: false,
  loading: () => <div>Loading preferences...</div>
});

const HomePage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Healthcare Portal</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">Preferences</h2>
          <Preferences />
        </div>
        
        <div className="border p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">ICD Tests</h2>
          <div>Loading ICD Tests...</div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 