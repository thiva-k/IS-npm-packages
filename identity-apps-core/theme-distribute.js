/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com).
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

const path = require("path");
const fs = require("fs-extra");
const themeFiles = path.join(__dirname, "..", "modules", "theme", "dist", "lib");
const apps = [ "authentication-portal", "recovery-portal", "x509-certificate-authentication-portal" ];

// Check for the themes folder in each app and delete it if exists.
async function deleteExistingThemesFolder() {
    for (const app of apps) {
        const themePath = path.join(__dirname, "apps", app, "src", "main", "webapp", "libs", "themes");
        if (fs.existsSync(themePath)) {
            console.log(`Deleting existing themes folder in ${app} app...`);
            await fs.remove(themePath);
        }
    }
}

// Copy the theme files to each app.
async function copyThemeFiles() {
    for (const app of apps) {
        console.log(`Copying theme files to ${app} app...`);
        await fs.copy(themeFiles, path.join(__dirname, "apps", app, "src", "main", "webapp", "libs"));
    }
}

async function main() {
    try {
        await deleteExistingThemesFolder();
        await copyThemeFiles();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

main();
