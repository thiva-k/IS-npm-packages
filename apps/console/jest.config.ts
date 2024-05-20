/**
 * Copyright (c) 2020-2024, WSO2 LLC. (https://www.wso2.com).
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

module.exports = {
    displayName: "console",
    moduleDirectories: [
        "node_modules",
        "test-configs",
        __dirname
    ],
    moduleFileExtensions: [
        "js",
        "jsx",
        "ts",
        "tsx",
        "json",
        "node"
    ],
    moduleNameMapper: {
        "@oxygen-ui/react": "<rootDir>/node_modules/@oxygen-ui/react",
        "@thiva/core/api": "<rootDir>/../../modules/core/dist/src/api",
        "@thiva/core/configs": "<rootDir>/../../modules/core/dist/src/configs",
        "@thiva/core/constants": "<rootDir>/../../modules/core/dist/src/constants",
        "@thiva/core/errors": "<rootDir>/../../modules/core/dist/src/errors",
        "@thiva/core/exceptions": "<rootDir>/../../modules/core/dist/src/exceptions",
        "@thiva/core/helpers": "<rootDir>/../../modules/core/dist/src/helpers",
        "@thiva/core/hooks": "<rootDir>/../../modules/core/dist/src/hooks",
        "@thiva/core/models": "<rootDir>/../../modules/core/dist/src/models",
        "@thiva/core/store": "<rootDir>/../../modules/core/dist/src/store",
        "@thiva/core/utils": "<rootDir>/../../modules/core/dist/src/utils",
        "@thiva/core/workers": "<rootDir>/../../modules/core/dist/src/workers",
        "@thiva/dynamic-forms":  "<rootDir>/../../modules/dynamic-forms/dist",
        "@thiva/form": "<rootDir>/../../modules/form/dist",
        "@thiva/forms": "<rootDir>/../../modules/forms/dist",
        "@thiva/react-components": "<rootDir>/../../modules/react-components/dist",
        "\\.(css|less|scss)$": "<rootDir>/test-configs/__mocks__/style-file.ts",
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|md)$":
            "<rootDir>/test-configs/__mocks__/file.ts",
        "\\.svg": "<rootDir>/test-configs/__mocks__/svgr.ts",
        "^lodash-es/(.*)$": "<rootDir>/../../node_modules/lodash/$1",
        "^react($|/.+)": "<rootDir>/node_modules/react$1",
        "uuid": "<rootDir>/node_modules/uuid"
    },
    modulePaths: [
        "<rootDir>"
    ],
    roots: [
        "src"
    ],
    setupFilesAfterEnv: [
        "<rootDir>/test-configs/setup-test.ts"
    ],
    testEnvironment: "jest-environment-jsdom-global",
    testMatch: [
        "<rootDir>/**/?(*.)test.{ts,tsx}"
    ],
    testPathIgnorePatterns: [
        "<rootDir>/(build|docs|node_modules)/"
    ],
    transform: {
        "^.+\\.(js|jsx)?$": "babel-jest",
        "^.+\\.(ts|tsx)?$": [ "ts-jest", {
            tsconfig: "<rootDir>/tsconfig.json"
        } ]
    },
    transformIgnorePatterns: [
        "/node_modules/?(?!@thiva)",
        "/node_modules/(?!@oxygen-ui/react/)"
    ],
    verbose: true
};
