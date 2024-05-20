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

import {
    VerticalStepper,
    VerticalStepperStepInterface
} from "@thiva/admin.core.v1";
import { hasRequiredScopes } from "@thiva/core/helpers";
import { TestableComponentInterface } from "@thiva/core/models";
import { GenericIcon, Heading, Link, PageHeader, Text } from "@thiva/react-components";
import React, { FunctionComponent, ReactElement, useMemo, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Grid } from "semantic-ui-react";
import BuildLoginFlowStep01Illustration from "./assets/build-login-flow-01.png";
import BuildLoginFlowStep02Illustration from "./assets/build-login-flow-02.png";
import BuildLoginFlowStep03Illustration from "./assets/build-login-flow-03.png";
import ApplicationSelectionModal
    from "@thiva/admin.extensions.v1/components/shared/application-selection-modal";
import {
    ConnectionInterface,
    ConnectionTemplateInterface
} from "@thiva/admin.connections.v1/models/connection";
import { FeatureConfigInterface } from "@thiva/admin.core.v1/models";
import { AppState } from "@thiva/admin.core.v1/store";

/**
 * Prop types of the component.
 */
interface GitHubAuthenticatorQuickStartPropsInterface extends TestableComponentInterface {
    /**
     * Identity provider object.
     */
    identityProvider: ConnectionInterface;
    /**
     * Identity provider template object.
     */
    template: ConnectionTemplateInterface;
}

/**
 * Quick start content for the GitHub IDP template.
 *
 * @param props - Props injected into the component.
 *
 * @returns GitHub IDP template quick start component.
 */
const GitHubAuthenticatorQuickStart: FunctionComponent<GitHubAuthenticatorQuickStartPropsInterface> = (
    props: GitHubAuthenticatorQuickStartPropsInterface
): ReactElement => {

    const {
        [ "data-testid" ]: testId
    } = props;

    const { t } = useTranslation();

    const [ showApplicationModal, setShowApplicationModal ] = useState<boolean>(false);

    const featureConfig: FeatureConfigInterface = useSelector((state: AppState) => state.config.ui.features);
    const allowedScopes: string = useSelector((state: AppState) => state?.auth?.allowedScopes);

    const isApplicationReadAccessAllowed: boolean = useMemo(() => (
        hasRequiredScopes(
            featureConfig?.applications, featureConfig?.applications?.scopes?.read, allowedScopes)
    ), [ featureConfig, allowedScopes ]);

    /**
     * Vertical Stepper steps.
     * @returns List of steps.
     */
    const steps: VerticalStepperStepInterface[] = [
        {
            stepContent: (
                <>
                    <Text>
                        <Trans
                            i18nKey={
                                "extensions:develop.identityProviders.github.quickStart.steps.selectApplication.content"
                            }
                        >
                            Choose the { isApplicationReadAccessAllowed ? (
                                <Link external={ false } onClick={ () => setShowApplicationModal(true) }>
                                application </Link>) : "application" }
                            for which you want to set up Github login.
                        </Trans>
                    </Text>
                </>
            ),
            stepTitle: t("extensions:develop.identityProviders.github.quickStart.steps.selectApplication.heading")
        },
        {
            stepContent: (
                <>
                    <Text>
                        <Trans
                            i18nKey={ "extensions:develop.identityProviders.github.quickStart.steps." +
                            "selectDefaultConfig.content" }
                        >
                            Go to <strong>Login Flow</strong> tab and click on the <strong>Add Sign In Option</strong>
                            button inside the login box. And select a Github connection.
                        </Trans>
                    </Text>
                    <GenericIcon inline transparent icon={ BuildLoginFlowStep01Illustration } size="huge"/>
                    <GenericIcon inline transparent icon={ BuildLoginFlowStep02Illustration } size="huge"/>
                    <GenericIcon inline transparent icon={ BuildLoginFlowStep03Illustration } size="huge"/>
                </>
            ),
            stepTitle: (
                <Trans
                    i18nKey={ "extensions:develop.identityProviders.github.quickStart.steps." +
                    "selectDefaultConfig.heading" }
                >
                    Add a <strong>Github</strong> connection
                </Trans>
            )
        }
    ];

    return (
        <>
            <Grid data-testid={ testId } className="authenticator-quickstart-content">
                <Grid.Row textAlign="left">
                    <Grid.Column width={ 16 }>
                        <PageHeader
                            className="mb-2"
                            title={ t("extensions:develop.identityProviders.github.quickStart.heading") }
                            imageSpaced={ false }
                            bottomMargin={ false }
                        />
                        <Heading subHeading as="h6">
                            { t("extensions:develop.identityProviders.github.quickStart.subHeading") }
                        </Heading>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row textAlign="left">
                    <Grid.Column width={ 16 }>
                        <VerticalStepper
                            alwaysOpen
                            isSidePanelOpen
                            stepContent={ steps }
                            isNextEnabled={ true }
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            {
                showApplicationModal && (
                    <ApplicationSelectionModal
                        data-testid={ `${ testId }-application-selection-modal` }
                        open={ showApplicationModal }
                        onClose={ () => setShowApplicationModal(false) }
                        heading={
                            t("extensions:develop.identityProviders.github.quickStart.addLoginModal.heading")
                        }
                        subHeading={
                            t("extensions:develop.identityProviders.github.quickStart.addLoginModal.subHeading")
                        }
                    />
                )
            }
        </>
    );
};

/**
 * Default props for the component
 */
GitHubAuthenticatorQuickStart.defaultProps = {
    "data-testid": "github-authenticator-quick-start"
};

/**
 * A default export was added to support React.lazy.
 * TODO: Change this to a named export once react starts supporting named exports for code splitting.
 * @see {@link https://reactjs.org/docs/code-splitting.html#reactlazy}
 */
export default GitHubAuthenticatorQuickStart;
