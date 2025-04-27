import { useRouter as usePagesRouter } from 'next/router';
import { useRouter as useAppRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useSharedRouter = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return {
      push: (path: string) => {
        window.location.href = path;
      },
      replace: (path: string) => {
        window.location.replace(path);
      },
      back: () => {
        window.history.back();
      },
      pathname: window.location.pathname,
      query: {},
      asPath: window.location.pathname,
    };
  }

  try {
    // Try to use App Router first
    return useAppRouter();
  } catch (e) {
    try {
      // Try to use Pages Router
      return usePagesRouter();
    } catch (e) {
      // Fallback to a minimal router implementation
      return {
        push: (path: string) => {
          window.location.href = path;
        },
        replace: (path: string) => {
          window.location.replace(path);
        },
        back: () => {
          window.history.back();
        },
        pathname: window.location.pathname,
        query: {},
        asPath: window.location.pathname,
      };
    }
  }
}; 