const fs = require('fs-extra');
const { exec } = require('child_process');
const path = require('path');

const mainFolder = '.'; // Change this to your main folder path

async function runRollup() {
  const subFolders = await getSubFolders(mainFolder);

  for (const folder of subFolders) {
    const hasPublicApi = await checkIfPublicApiExists(folder); // Check if public-api.ts exists
    if (!hasPublicApi) {
      console.log(`Skipping ${folder} as it does not contain public-api.ts`);
      continue;
    }

    const isCompiled = await checkIfCompiled(folder); // Check if rollup compiled
    if (!isCompiled) {
      await runCommand(folder, 'pnpm rollup -c'); // Run rollup if not compiled
    }
  }
}

async function getSubFolders(rootFolder) {
  const dirents = await fs.readdir(rootFolder, { withFileTypes: true });
  return dirents
    .filter(dirent => dirent.isDirectory())
    .map(dirent => path.join(rootFolder, dirent.name));
}

async function checkIfPublicApiExists(folder) {
  const publicApiPath = path.join(folder, 'public-api.ts');
  return await fs.pathExists(publicApiPath);
}

async function checkIfCompiled(folder) {
  const distFilePath = path.join(folder, 'dist', 'esm', 'public-api.js');
  const packageJsonPath = path.join(folder, 'package.json');
  return (await fs.pathExists(distFilePath)) && (await fs.pathExists(packageJsonPath));
}

async function runCommand(folder, command) {
  return new Promise((resolve, reject) => {
    exec(command, { cwd: folder }, (err, stdout, stderr) => {
      if (err) {
        console.error(`Error executing command in ${folder}:`, err);
        reject(err);
      } else {
        console.log(`Command executed successfully in ${folder}:`, stdout);
        resolve();
      }
    });
  });
}

// Example usage
runRollup().catch(err => console.error('Error:', err));
