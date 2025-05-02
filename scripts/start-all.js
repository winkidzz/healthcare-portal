const { spawn } = require('child_process');
const path = require('path');

function startService(name, command, cwd) {
  const service = spawn(command, [], {
    shell: true,
    cwd,
    env: {
      ...process.env,
      NEXT_PRIVATE_LOCAL_WEBPACK: 'true',
      NODE_ENV: 'development'
    },
    stdio: 'inherit'
  });

  service.on('error', (error) => {
    console.error(`Failed to start ${name}:`, error);
    process.exit(1);
  });

  service.on('exit', (code) => {
    console.log(`${name} exited with code ${code}`);
    process.exit(code);
  });

  console.log(`Started ${name}`);
}

const rootDir = path.resolve(__dirname, '..');

// Start host app
startService(
  'host-app',
  'npm run dev:next',
  path.join(rootDir, 'apps/host-app')
);

// Start preferences MFE
startService(
  'preferences-mfe',
  'npm run dev:next',
  path.join(rootDir, 'apps/preferences-mfe')
);

// Start ICD tests MFE
startService(
  'icd-tests-mfe',
  'npm run dev:next',
  path.join(rootDir, 'apps/icd-tests-mfe')
); 