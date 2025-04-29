const { execSync } = require('child_process');

const PORTS = [3000, 3001, 3002];

function killPort(port) {
  try {
    console.log(`Checking port ${port}...`);
    execSync(`lsof -ti:${port} | xargs kill -9 2>/dev/null || true`);
    console.log(`✓ Port ${port} is now free`);
  } catch (error) {
    console.log(`✓ Port ${port} was already free`);
  }
}

console.log('🔄 Killing processes on MFE ports...');
PORTS.forEach(killPort);
console.log('✅ All ports cleared'); 