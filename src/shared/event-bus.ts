type EventMap = {
  'settings:changed': { theme: string; language: string };
  'user:authenticated': { userId: string; role: string };
  'test:selected': { testId: string; category: string };
};

class EventBus {
  private listeners: Map<keyof EventMap, Set<Function>> = new Map();

  emit<K extends keyof EventMap>(event: K, data: EventMap[K]) {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach(listener => listener(data));
    }
    
    // Dispatch custom event for cross-micro-frontend communication
    window.dispatchEvent(new CustomEvent(event, {
      detail: data,
      bubbles: true,
      composed: true
    }));
  }

  on<K extends keyof EventMap>(event: K, callback: (data: EventMap[K]) => void) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)?.add(callback);

    // Also listen for window events
    const handler = (e: CustomEvent) => callback(e.detail);
    window.addEventListener(event, handler as EventListener);

    // Return unsubscribe function
    return () => {
      this.listeners.get(event)?.delete(callback);
      window.removeEventListener(event, handler as EventListener);
    };
  }
}

export const eventBus = new EventBus(); 