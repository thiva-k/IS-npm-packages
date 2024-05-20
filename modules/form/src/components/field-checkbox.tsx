/**
 * Copyright (c) 2021-2023, WSO2 LLC. (https://www.wso2.com).
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

import { TestableComponentInterface } from "@thiva/core/models";
import { Hint, Message } from "@thiva/react-components";
import React, { Fragment, FunctionComponent, ReactElement } from "react";
import { Field as FinalFormField } from "react-final-form";
import { CheckboxAdapter } from "./adapters/__DEPRECATED__adapters";
import { FormFieldPropsInterface } from "./field";
import { FormFieldMessage } from "../models";

/**
 * Interface for the Checkbox field component.
 */
export interface FieldCheckboxPropsInterface extends FormFieldPropsInterface, TestableComponentInterface {

    /**
     * Hint of the form field.
     */
    hint?: string | ReactElement;
    /**
     * Message to be displayed.
     */
    message?: FormFieldMessage;
    /**
     * Call back to trigger on input onChange.
     */
    listen?: (values) => void;
}

/**
 * Implementation of the Checkbox Field component.
 *
 * @param props - Props injected to the component.
 *
 * @returns
 */
export const FieldCheckbox: FunctionComponent<FieldCheckboxPropsInterface> = (
    props: FieldCheckboxPropsInterface
): ReactElement => {

    const {
        [ "data-testid" ]: testId,
        ...rest
    } = props;

    const resolveInputFieldMessage = () => {
        switch (props.message.type) {
            case "info":
                return (
                    <Message
                        type={ props.message.type }
                        content={ props.message.content }
                        header={ props.message.header }
                    />
                );
            case "warning":
                return (
                    <Message
                        type={ props.message.type }
                        content={ props.message.content }
                        header={ props.message.header }
                    />
                );
            case "error":
                return (
                    <Message
                        type={ props.message.type }
                        content={ props.message.content }
                        header={ props.message.header }
                    />
                );
        }
    };

    return (
        <Fragment>
            <FinalFormField
                key={ testId }
                type="checkbox"
                name={ props.name }
                component={ CheckboxAdapter }
                data-testid={ testId }
                { ...rest }
            />
            {
                props.hint && (
                    <Hint compact>
                        { props.hint }
                    </Hint>
                )
            }
            {
                props.message && (
                    resolveInputFieldMessage()
                )
            }
        </Fragment>
    );
};

/**
 * Default props for the component.
 */
FieldCheckbox.defaultProps = {
    "data-testid": "oxygen-checkbox-field"
};
