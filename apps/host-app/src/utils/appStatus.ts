import logger from './logger';

interface AppStatus {
  isRunning: boolean;
  lastStatus?: string;
  lastUpdate?: string;
}

export async function checkAppStatus(): Promise<AppStatus> {
  try {
    // For now, we'll assume the app is running if we can access the logger
    // In a real implementation, you might want to check actual application state
    return {
      isRunning: true,
      lastStatus: 'running',
      lastUpdate: new Date().toISOString()
    };
  } catch (error) {
    logger.error('Error checking app status', { error });
    return {
      isRunning: false,
      lastStatus: 'error',
      lastUpdate: new Date().toISOString()
    };
  }
}

export async function waitForAppStatus(
  expectedStatus: 'running' | 'stopped',
  timeout: number = 30000,
  interval: number = 1000
): Promise<boolean> {
  const startTime = Date.now();

  while (Date.now() - startTime < timeout) {
    const status = await checkAppStatus();
    if (status.isRunning === (expectedStatus === 'running')) {
      return true;
    }
    await new Promise(resolve => setTimeout(resolve, interval));
  }

  return false;
} 