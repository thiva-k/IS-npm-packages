/**
 * Copyright (c) 2019, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
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

import { IdentifiableComponentInterface, TestableComponentInterface } from "@thiva/core/models";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { getWidgetIcons } from "../../../configs";
import { AppConstants, CommonConstants } from "../../../constants";
import { history } from "../../../helpers";
import { SettingsSection } from "../../shared";

type AccountSecurityWidgetPropsInterface = TestableComponentInterface & IdentifiableComponentInterface;

/**
 * Account security widget.
 * Also see {@link AccountSecurityWidget.defaultProps}
 *
 * @param props - Props injected to the component.
 * @returns Account Security Widget.
 */
export const AccountSecurityWidget: FunctionComponent<AccountSecurityWidgetPropsInterface> = (
    props: AccountSecurityWidgetPropsInterface
): JSX.Element => {

    const { ["data-testid"]: testId } = props;
    const { t } = useTranslation();

    const navigate = () => {
        history.push(AppConstants.getPaths().get("SECURITY") + "#" + CommonConstants.ACCOUNT_SECURITY);
    };

    return (
        <div className="widget account-security" data-testid={ testId }>
            <SettingsSection
                className="overview"
                data-testid={ `${testId}-settings-section` }
                header={ t("myAccount:components.overview.widgets.accountSecurity.header") }
                description={ t("myAccount:components.overview.widgets.accountSecurity.description") }
                primaryAction={ t("myAccount:components.overview.widgets.accountSecurity.actionTitles.update") }
                onPrimaryActionClick={ navigate }
                icon={ getWidgetIcons().accountSecurity }
                iconMini={ getWidgetIcons().accountSecurity }
                iconSize="x60"
                iconStyle="twoTone"
            />
        </div>
    );
};

/**
 * Default properties of {@link AccountSecurityWidget}
 *
 * {@link AccountSecurityWidget} has no component specific properties to
 * be defined in a typed interface so instead it directly uses
 * {@link TestableComponentInterface} as its prop type definition.
 *
 * Example to extend if {@link AccountSecurityWidget} has custom props: -
 *
 * ```
 * interface AccountSecurityWidgetProps extends TestableComponentInterface { prop: type }
 *
 * // Wrap props interface with {@link React.PropsWithChildren} if has child widgets.
 * export const AccountSecurityWidget: FunctionComponent<AccountSecurityWidgetProps> = (
 *      props: AccountSecurityWidgetProps
 * ): JSX.Element => { ... }
 * ```
 */
AccountSecurityWidget.defaultProps = {
    "data-testid": "account-security-overview-widget"
};
