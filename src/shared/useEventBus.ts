import { useEffect } from 'react';
import { eventBus, EventMap } from './event-bus';

export function useEventBus<K extends keyof EventMap>(
  event: K,
  callback: (data: EventMap[K]) => void,
  dependencies: any[] = []
) {
  useEffect(() => {
    const unsubscribe = eventBus.on(event, callback);
    return () => {
      unsubscribe();
    };
  }, [event, ...dependencies]);
} 