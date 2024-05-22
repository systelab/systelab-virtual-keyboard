/*
 * Copyright (c) 2020 - 2024 - Instrumentation Laboratory Company and Systelab Technologies, SA. All rights reserved.
 * NOTICE:  All information contained herein is and remains the property of Instrumentation Laboratory Company and its
 * affiliates, if any.  The intellectual and technical concepts contained herein are proprietary to Instrumentation
 * Laboratory Company and its affiliates and may be covered by U.S. and foreign patents and patent applications, and/or
 * are protected by trade secret or copyright law. Dissemination of this information or reproduction of this material is
 * strictly forbidden unless prior written permission is Instrumentation Laboratory Company.
 */

export enum SystelabVirtualKeyboardButton {
    Done = '{done}',
    Enter = '{enter}',
    Shift = '{shift}',
    Lock = '{lock}',
    Backspace = '{bksp}',
    Language = '{language}',
    Space = '{space}',
    Tab = '{tab}',
}

export enum SystelabVirtualKeyboardLayouts {
    default = 'default',
    shift = 'shift',
    numeric = 'numeric',
}

export enum SystelabVirtualKeyboardInputMethods {
    onlyMouseEvents = 'onlyMouseEvents',
    onlyTouchEvents = 'onlyTouchEvents',
}

export enum SystelabVirtualKeyboardInputModes {
    text = 'text',
    numeric = 'numeric',
    password = 'password',
}
