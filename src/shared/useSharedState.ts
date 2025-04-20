import { useEffect, useState } from 'react';
import { stateManager } from './state-manager';

export function useSharedState<T>(key: string, initialValue?: T): [T, (value: T) => void] {
  const [state, setState] = useState<T>(() => {
    const saved = stateManager.get(key);
    return saved !== undefined ? saved : initialValue;
  });

  useEffect(() => {
    const unsubscribe = stateManager.subscribe(key, (newValue: T) => {
      setState(newValue);
    });

    return () => {
      unsubscribe();
    };
  }, [key]);

  const setSharedState = (value: T) => {
    stateManager.set(key, value);
  };

  return [state, setSharedState];
} 