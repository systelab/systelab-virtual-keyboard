/*
 * Copyright (c) 2020 - 2024 - Instrumentation Laboratory Company and Systelab Technologies, SA. All rights reserved.
 * NOTICE:  All information contained herein is and remains the property of Instrumentation Laboratory Company and its
 * affiliates, if any.  The intellectual and technical concepts contained herein are proprietary to Instrumentation
 * Laboratory Company and its affiliates and may be covered by U.S. and foreign patents and patent applications, and/or
 * are protected by trade secret or copyright law. Dissemination of this information or reproduction of this material is
 * strictly forbidden unless prior written permission is Instrumentation Laboratory Company.
 */

export namespace SystelabVirtualKeyboard {

    export interface Config {
        layout?: SystelabVirtualKeyboard.Layouts;
        inputMethod?: SystelabVirtualKeyboard.InputMethods;
        showIcon?: boolean;
        showOnMouseClick?: boolean;
        numericCloseOnEnter?: boolean;
        actionText?: string;
    }

    export enum InputMethods {
        onlyMouseEvents = 'onlyMouseEvents',
        onlyTouchEvents = 'onlyTouchEvents',
    }

    export enum Layouts {
        AlphaNumeric = 'alpha-numeric',
        AlphaNumericShift = 'alpha-numeric-shift',
        AlphaNumericUppercase = 'alpha-numeric-uppercase',
        AlphaNumericUppercaseShift = 'alpha-numeric-uppercase-shift',
        Numeric = 'numeric',
        NumericShift = 'numeric-shift',
    }

    export enum Buttons {
        Done = '{done}',
        Enter = '{enter}',
        Shift = '{shift}',
        Lock = '{lock}',
        Backspace = '{bksp}',
        Language = '{language}',
        Space = '{space}',
        Tab = '{tab}',
    }
}
