const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname);

fs.readdirSync(rootDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .forEach(dirent => {
    const packageDir = path.join(rootDir, dirent.name);
    const rollupConfigPath = path.join(packageDir, 'rollup.config.js');
    const packageJsonPath = path.join(packageDir, 'package.json');

    if (fs.existsSync(rollupConfigPath)) {
        console.log(`Building ${dirent.name}`);
        execSync('pnpm rollup -c', { stdio: 'inherit', cwd: packageDir });
    }

    if (fs.existsSync(packageJsonPath)) {
        console.log(`Publishing ${dirent.name}`);
        execSync('npm publish', { stdio: 'inherit', cwd: packageDir });
    }
  });
