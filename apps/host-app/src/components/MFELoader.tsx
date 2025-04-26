'use client';

import React, { useEffect, useState, useRef } from 'react';
import styles from './MFELoader.module.css';

interface MFELoaderProps {
  url: string;
  name: string;
}

const MFELoader: React.FC<MFELoaderProps> = ({ url, name }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const loadMicroFrontend = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Load the micro-frontend script
      await new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load ${name}`));
        document.head.appendChild(script);
      });

      if (!isMounted.current) return;

      setIsLoading(false);
    } catch (err) {
      if (!isMounted.current) return;
      setError(err instanceof Error ? err.message : 'Failed to load micro-frontend');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      loadMicroFrontend();
    }
  }, [url, name]);

  if (isLoading) {
    return (
      <div className={styles.loader}>
        <div className={styles.spinner} />
        <p>Loading {name}...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>{error}</p>
        <button className={styles.retryButton} onClick={loadMicroFrontend}>
          Retry
        </button>
      </div>
    );
  }

  return <div id={`${name}-container`} />;
};

export default MFELoader; 