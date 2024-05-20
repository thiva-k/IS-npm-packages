/**
 * Copyright (c) 2022, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
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

import { AsgardeoSPAClient, HttpInstance, HttpRequestConfig } from "@asgardeo/auth-react";
import { IdentityAppsApiException } from "@thiva/core/exceptions";
import { HttpMethods } from "@thiva/core/models";
import { AxiosError, AxiosResponse } from "axios";
import { MultiFactorAuthenticationConstants } from "../constants/mfa-constants";
import { BackupCodeInterface, BackupCodesCountInterface } from "../models";
import { store } from "../store";

/**
 * Get an axios instance.
 */
const httpClient: HttpInstance = AsgardeoSPAClient.getInstance().httpRequest.bind(AsgardeoSPAClient.getInstance());

/**
 * Generate backup codes the authenticated user.
 */
export const generateBackupCodes = (): Promise<BackupCodeInterface> => {
    const requestConfig: HttpRequestConfig = {
        headers: {
            "Access-Control-Allow-Origin": store.getState()?.config?.deployment?.clientHost,
            "Content-Type": "application/json"
        },
        method: HttpMethods.POST,
        url: store.getState().config.endpoints.backupCode
    };

    return httpClient(requestConfig)
        .then((response: AxiosResponse) => {
            if (response.status !== 200) {
                return Promise.reject(`An error occurred. The server returned ${response.status}`);
            }

            return Promise.resolve(response.data as BackupCodeInterface);
        })
        .catch((error: AxiosError) => {
            throw new IdentityAppsApiException(
                MultiFactorAuthenticationConstants.MFA_BACKUP_CODE_INIT_ERROR,
                error.stack,
                error.code,
                error.request,
                error.response,
                error.config);
        });
};

/**
 * This API is used to delete backup codes of the authenticated user.
 */
export const deleteBackupCode = (): Promise<any> => {
    const requestConfig: HttpRequestConfig = {
        headers: {
            "Access-Control-Allow-Origin": store.getState()?.config?.deployment?.clientHost,
            "Content-Type": "application/json"
        },
        method: HttpMethods.DELETE,
        url: store.getState().config.endpoints.backupCode
    };

    return httpClient(requestConfig)
        .then((response: AxiosResponse) => {
            if (response.status !== 200) {
                return Promise.reject(`An error occurred. The server returned ${response.status}`);
            }

            return Promise.resolve(response);
        })
        .catch((error: AxiosError) => {
            throw new IdentityAppsApiException(
                MultiFactorAuthenticationConstants.MFA_BACKUP_CODE_DELETE_ERROR,
                error.stack,
                error.code,
                error.request,
                error.response,
                error.config);
        });
};

/**
 * This API is used to retrieve backup codes of the authenticated user.
 */
export const getRemainingBackupCodesCount = (): Promise<BackupCodesCountInterface> => {
    const requestConfig: HttpRequestConfig = {
        headers: {
            "Access-Control-Allow-Origin": store.getState()?.config?.deployment?.clientHost,
            "Content-Type": "application/json"
        },
        method: HttpMethods.GET,
        url: store.getState().config.endpoints.backupCode
    };

    return httpClient(requestConfig)
        .then((response: AxiosResponse) => {
            if (response.status !== 200) {
                return Promise.reject(`An error occurred. The server returned ${response.status}`);
            }

            return Promise.resolve(response.data as BackupCodesCountInterface);
        })
        .catch((error: AxiosError) => {
            throw new IdentityAppsApiException(
                MultiFactorAuthenticationConstants.MFA_BACKUP_CODE_RETRIEVE_ERROR,
                error.stack,
                error.code,
                error.request,
                error.response,
                error.config);
        });
};
