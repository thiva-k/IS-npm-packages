/**
 * Copyright (c) 2024, WSO2 LLC. (https://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, "..");

fs.readdirSync(rootDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .forEach(dirent => {
    const packageDir = path.join(rootDir, dirent.name);
    const rollupConfigPath = path.join(packageDir, 'rollup.config.js');
    const packageJsonPath = path.join(packageDir, 'package.json');

    if (fs.existsSync(rollupConfigPath)) {
        console.log(`Building ${dirent.name}`);
        const rollupProcess = spawnSync('pnpm', ['rollup', '-c'], { stdio: 'inherit', cwd: packageDir });
        if (rollupProcess.error) {
            console.error(`Error building ${dirent.name}:`, rollupProcess.error);
        }
    }

    if (fs.existsSync(packageJsonPath)) {
        console.log(`Publishing ${dirent.name}`);
        const publishProcess = spawnSync('npm', ['publish'], { stdio: 'inherit', cwd: packageDir });
        if (publishProcess.error) {
            console.error(`Error publishing ${dirent.name}:`, publishProcess.error);
        }
    }
  });
