const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const config = require('./config.json');

function startServer(serverName) {
  const serverConfig = config.mcpServers[serverName];
  if (!serverConfig) {
    console.error(`Server ${serverName} not found in config`);
    process.exit(1);
  }

  const { command, args, env } = serverConfig;
  
  const serverProcess = spawn(command, args, {
    env: {
      ...process.env,
      ...env
    },
    stdio: 'inherit'
  });

  serverProcess.on('error', (error) => {
    console.error(`Failed to start ${serverName}:`, error);
    process.exit(1);
  });

  serverProcess.on('exit', (code) => {
    console.log(`${serverName} exited with code ${code}`);
    process.exit(code);
  });

  // Save PID for cleanup
  const pidFile = path.join(__dirname, `${serverName}.pid`);
  fs.writeFileSync(pidFile, serverProcess.pid.toString());

  console.log(`Started ${serverName} with PID ${serverProcess.pid}`);
}

const serverName = process.argv[2];
if (!serverName) {
  console.error('Please provide a server name');
  process.exit(1);
}

startServer(serverName); 