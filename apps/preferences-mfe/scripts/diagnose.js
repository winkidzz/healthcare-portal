import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function checkDependencies() {
  console.log('Checking dependencies...');
  try {
    const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'));
    const nodeModules = path.join(__dirname, '../node_modules');
    
    if (!fs.existsSync(nodeModules)) {
      console.error('❌ node_modules not found. Run npm install');
      return false;
    }

    // Check for duplicate React installations
    const findReact = "find ../node_modules -type f -name 'package.json' | xargs grep -l 'react'";
    const reactInstalls = execSync(findReact, { cwd: __dirname }).toString();
    if (reactInstalls.split('\n').length > 2) {
      console.warn('⚠️ Multiple React installations detected. This may cause issues.');
    }

    return true;
  } catch (error) {
    console.error('❌ Error checking dependencies:', error);
    return false;
  }
}

function checkBuildFiles() {
  console.log('Checking build files...');
  try {
    const distDir = path.join(__dirname, '../../../packages/shared-library/dist');
    if (!fs.existsSync(distDir)) {
      console.error('❌ Shared library dist folder not found. Run build in shared-library');
      return false;
    }

    const contextFile = path.join(distDir, 'context.js');
    if (!fs.existsSync(contextFile)) {
      console.error('❌ context.js not found in shared library dist');
      return false;
    }

    // Check if the built files contain JSX
    const contextContent = fs.readFileSync(contextFile, 'utf8');
    if (contextContent.includes('return <')) {
      console.error('❌ JSX found in built files. Babel transform may not be working correctly');
      return false;
    }

    return true;
  } catch (error) {
    console.error('❌ Error checking build files:', error);
    return false;
  }
}

function checkPorts() {
  console.log('Checking ports...');
  try {
    const ports = [3002, 4000];
    ports.forEach(port => {
      try {
        execSync(`lsof -i :${port}`);
        console.warn(`⚠️ Port ${port} is in use`);
      } catch {
        console.log(`✅ Port ${port} is available`);
      }
    });
    return true;
  } catch (error) {
    console.error('❌ Error checking ports:', error);
    return false;
  }
}

function main() {
  console.log('🔍 Starting diagnostics...\n');
  
  const checks = [
    { name: 'Dependencies', fn: checkDependencies },
    { name: 'Build files', fn: checkBuildFiles },
    { name: 'Ports', fn: checkPorts }
  ];

  let success = true;
  checks.forEach(({ name, fn }) => {
    console.log(`\n📋 ${name} check:`);
    success = fn() && success;
  });

  console.log('\n🏁 Diagnostics complete.');
  if (!success) {
    console.log('\n❌ Some checks failed. Please address the issues above.');
    process.exit(1);
  }
  console.log('\n✅ All checks passed.');
}

main(); 