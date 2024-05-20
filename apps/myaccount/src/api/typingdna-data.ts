/**
 * Copyright (c) 2021, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
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

import { AsgardeoSPAClient, HttpError, HttpInstance, HttpRequestConfig, HttpResponse } from "@asgardeo/auth-react";
import { HttpMethods } from "@thiva/core/models";
import { store } from "../store";

const httpClient: HttpInstance = AsgardeoSPAClient.getInstance().httpRequest.bind(AsgardeoSPAClient.getInstance());

/**
 * This function is used to delete users' typing patterns in TypingDNA.
 */
export const deleteTypingPatterns = (): Promise<any> => {

    const requestConfig: HttpRequestConfig = {
        headers: {
            "Content-Type": "application/json"
        },
        method: HttpMethods.DELETE,
        url: store.getState().config.endpoints.typingDNAMe
    };

    return httpClient(requestConfig)
        .then((response: HttpResponse) => {
            if (response.status !== 200) {
                return Promise.reject(`An error occurred. The server returned ${response.status}`);
            }

            return Promise.resolve(response);
        })
        .catch((error: HttpError) => {
            return Promise.reject(error);
        });
};

export const isTypingDNAEnabled = (): Promise<boolean> => {
    const requestConfig: HttpRequestConfig = {
        headers: {
            "Content-Type": "application/json"
        },
        method: HttpMethods.GET,
        url: store.getState().config.endpoints.typingDNAServer
    };

    return httpClient(requestConfig)
        .then((response: HttpResponse) => {
            if (response.status !== 200) {
                return Promise.resolve(false);
            }

            if (response.data.enabled == true) {
                return Promise.resolve(true);
            }

            return Promise.resolve(false);
        })
        .catch(() => {
            return Promise.resolve(false);
        });
};
