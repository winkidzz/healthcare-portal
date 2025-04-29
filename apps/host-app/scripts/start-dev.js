const { spawn } = require('child_process');
const net = require('net');
const path = require('path');

const PORT = process.env.PORT || 3000;

function isPortInUse(port) {
  return new Promise((resolve) => {
    const server = net.createServer()
      .once('error', () => resolve(true))
      .once('listening', () => {
        server.close();
        resolve(false);
      })
      .listen(port);
  });
}

async function startDevServer() {
  try {
    const portInUse = await isPortInUse(PORT);
    
    if (portInUse) {
      console.log(`Port ${PORT} is in use. Attempting to kill the process...`);
      try {
        const { execSync } = require('child_process');
        execSync(`lsof -ti:${PORT} | xargs kill -9`);
        console.log('Process killed successfully');
      } catch (error) {
        console.error('Failed to kill process:', error);
        process.exit(1);
      }
    }

    // Get the path to the next binary in the root node_modules
    const nextBinPath = path.resolve(__dirname, '../../../node_modules/.bin/next');

    const next = spawn(nextBinPath, ['dev'], {
      stdio: 'inherit',
      env: {
        ...process.env,
        PORT: PORT.toString(),
        NODE_OPTIONS: '--max-old-space-size=4096',
        NEXT_PRIVATE_LOCAL_WEBPACK: 'true'
      },
      shell: true
    });

    next.on('error', (err) => {
      console.error('Failed to start server:', err);
      process.exit(1);
    });

    // Handle process termination
    process.on('SIGTERM', () => {
      next.kill('SIGTERM');
      process.exit(0);
    });

    process.on('SIGINT', () => {
      next.kill('SIGINT');
      process.exit(0);
    });

  } catch (error) {
    console.error('Error starting development server:', error);
    process.exit(1);
  }
}

startDevServer(); 