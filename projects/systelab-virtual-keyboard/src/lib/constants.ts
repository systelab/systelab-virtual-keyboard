/*
 * Copyright (c) 2020 - 2024 - Instrumentation Laboratory Company and Systelab Technologies, SA. All rights reserved.
 * NOTICE:  All information contained herein is and remains the property of Instrumentation Laboratory Company and its
 * affiliates, if any.  The intellectual and technical concepts contained herein are proprietary to Instrumentation
 * Laboratory Company and its affiliates and may be covered by U.S. and foreign patents and patent applications, and/or
 * are protected by trade secret or copyright law. Dissemination of this information or reproduction of this material is
 * strictly forbidden unless prior written permission is Instrumentation Laboratory Company.
 */

export namespace SystelabVirtualKeyboardConstants {

    export enum Layouts {
        default = 'default',
        alphaNumeric = 'alpha-numeric',
        alphaNumericUppercase = 'alpha-numeric-uppercase',
        alphaNumericUppercaseShift = 'alpha-numeric-uppercase-shift',
        shift = 'shift',
        numeric = 'numeric',
    }

    export const LayoutDefinitions = {
        [SystelabVirtualKeyboardConstants.Layouts.default]: [
            '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
            '{tab} q w e r t y u i o p [ ] \\',
            "{lock} a s d f g h j k l ; ' {enter}",
            '{shift} z x c v b n m , . / {shift}',
            '{space}',
        ],
        [SystelabVirtualKeyboardConstants.Layouts.alphaNumeric]: [
            '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
            '{tab} q w e r t y u i o p [ ] \\',
            "{lock} a s d f g h j k l ; ' {enter}",
            '{shift} z x c v b n m , . / {shift}',
            '{space}',
        ],
        [SystelabVirtualKeyboardConstants.Layouts.alphaNumericUppercase]: [
            '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
            '{tab} Q W E R T Y U I O P { } |',
            '{lock} A S D F G H J K L : " {enter}',
            '{shift} Z X C V B N M &lt; &gt; ? {shift}',
            '{space}',
        ],
        [SystelabVirtualKeyboardConstants.Layouts.alphaNumericUppercaseShift]: [
            '~ ! @ # $ % ^ &amp; * ( ) _ + {bksp}',
            '{tab} Q W E R T Y U I O P { } |',
            '{lock} A S D F G H J K L : " {enter}',
            '{shift} Z X C V B N M &lt; &gt; ? {shift}',
            '{space}',
        ],
        [SystelabVirtualKeyboardConstants.Layouts.shift]: [
            '~ ! @ # $ % ^ &amp; * ( ) _ + {bksp}',
            '{tab} Q W E R T Y U I O P { } |',
            '{lock} A S D F G H J K L : " {enter}',
            '{shift} Z X C V B N M &lt; &gt; ? {shift}',
            '{space}',
        ],
        [SystelabVirtualKeyboardConstants.Layouts.numeric]: ['7 8 9', '4 5 6', '1 2 3', '0 {bksp}'],
    };

    export enum Button {
        Done = '{done}',
        Enter = '{enter}',
        Shift = '{shift}',
        Lock = '{lock}',
        Backspace = '{bksp}',
        Language = '{language}',
        Space = '{space}',
        Tab = '{tab}',
    }

    export enum InputMethods {
        onlyMouseEvents = 'onlyMouseEvents',
        onlyTouchEvents = 'onlyTouchEvents',
    }

    export enum InputModes {
        text = 'text',
        numeric = 'numeric',
        password = 'password',
    }
}
