/*
 * Copyright (c) 2020 - 2024 - Instrumentation Laboratory Company and Systelab Technologies, SA. All rights reserved.
 * NOTICE:  All information contained herein is and remains the property of Instrumentation Laboratory Company and its
 * affiliates, if any.  The intellectual and technical concepts contained herein are proprietary to Instrumentation
 * Laboratory Company and its affiliates and may be covered by U.S. and foreign patents and patent applications, and/or
 * are protected by trade secret or copyright law. Dissemination of this information or reproduction of this material is
 * strictly forbidden unless prior written permission is Instrumentation Laboratory Company.
 */

import { SystelabVirtualKeyboard } from './systelab-virtual-keyboard.public';
import { InjectionToken } from '@angular/core';

export namespace SystelabVirtualKeyboardConstants {

    export const VIRTUAL_KEYBOARD_CONFIG = new InjectionToken<SystelabVirtualKeyboard.Config>('VIRTUAL_KEYBOARD_CONFIG');

    export const LayoutDefinitions = {
        'default': [
            '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
            '{tab} q w e r t y u i o p { } |',
            '{lock} a s d f g h j k l : " {enter}',
            '{shift} z x c v b n m < > ? {shift}',
            '{space}',
        ],
        [SystelabVirtualKeyboard.Layouts.AlphaNumeric]: [
            '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
            '{tab} q w e r t y u i o p { } |',
            '{lock} a s d f g h j k l : " {enter}',
            '{shift} z x c v b n m < > ? {shift}',
            '{space}',
        ],
        [SystelabVirtualKeyboard.Layouts.AlphaNumericShift]: [
            '~ ! @ # $ % ^ &amp; * ( ) _ + {bksp}',
            '{tab} Q W E R T Y U I O P [ ] \\',
            "{lock} A S D F G H J K L ; ' {enter}",
            '{shift} Z X C V B N M , . / {shift}',
            '{space}',
        ],
        [SystelabVirtualKeyboard.Layouts.AlphaNumericUppercase]: [
            '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
            '{tab} Q W E R T Y U I O P [ ] \\',
            "{lock} A S D F G H J K L ; ' {enter}",
            '{shift} Z X C V B N M , . / {shift}',
            '{space}',
        ],
        [SystelabVirtualKeyboard.Layouts.AlphaNumericUppercaseShift]: [
            '~ ! @ # $ % ^ &amp; * ( ) _ + {bksp}',
            '{tab} Q W E R T Y U I O P [ ] \\',
            "{lock} A S D F G H J K L ; ' {enter}",
            '{shift} Z X C V B N M , . / {shift}',
            '{space}',
        ],
        [SystelabVirtualKeyboard.Layouts.Numeric]: ['7 8 9 {bksp}', '4 5 6 +', '1 2 3 -', '{shift} 0 . {enter}'],
        [SystelabVirtualKeyboard.Layouts.NumericShift]: ['! @ # {bksp}', '$ % _ =', '& * ( -', '{shift} ) . {enter}'],
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

    export enum InputModes {
        text = 'text',
        numeric = 'numeric',
        password = 'password',
    }
}
