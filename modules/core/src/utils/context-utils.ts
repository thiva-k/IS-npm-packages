/**
 * Copyright (c) 2020, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
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
import { RuntimeConfigInterface } from "../models";

/**
 * Utility class for context operations.
 * TODO: accept the runtime config time from the caller.
 */
export class ContextUtils {

    private static runtimeConfig: any;

    /**
     * Private constructor to avoid object instantiation from outside
     * the class.
     *
     * @hideconstructor
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() { }

    /**
     * Sets the runtime config object.
     *
     * @param {RuntimeConfigInterface} config - Runtime config.
     */
    public static setRuntimeConfig(config: RuntimeConfigInterface): void {
        this.runtimeConfig = config;
    }

    /**
     * Returns the runtime config.
     *
     * @return {RuntimeConfigInterface}
     */
    public static getRuntimeConfig(): RuntimeConfigInterface {
        return this.runtimeConfig;
    }
}
