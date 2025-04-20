class StateManager extends HTMLElement {
  private state: Map<string, any> = new Map();
  private subscribers: Map<string, Set<Function>> = new Map();

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    // Initialize with any persisted state
    this.loadPersistedState();
  }

  private loadPersistedState() {
    const persisted = localStorage.getItem('app-state');
    if (persisted) {
      this.state = new Map(JSON.parse(persisted));
    }
  }

  private savePersistedState() {
    localStorage.setItem('app-state', JSON.stringify([...this.state]));
  }

  set(key: string, value: any, persist: boolean = false) {
    this.state.set(key, value);
    if (persist) {
      this.savePersistedState();
    }
    this.notify(key, value);
  }

  get(key: string) {
    return this.state.get(key);
  }

  subscribe(key: string, callback: Function) {
    if (!this.subscribers.has(key)) {
      this.subscribers.set(key, new Set());
    }
    this.subscribers.get(key)?.add(callback);
    
    // Return unsubscribe function
    return () => {
      this.subscribers.get(key)?.delete(callback);
    };
  }

  private notify(key: string, value: any) {
    const subscribers = this.subscribers.get(key);
    if (subscribers) {
      subscribers.forEach(callback => callback(value));
    }
    
    // Dispatch custom event for cross-micro-frontend communication
    this.dispatchEvent(new CustomEvent('state-change', {
      detail: { key, value },
      bubbles: true,
      composed: true
    }));
  }
}

// Register the custom element
customElements.define('state-manager', StateManager);

// Export a singleton instance
export const stateManager = new StateManager(); 