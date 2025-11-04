import { InjectionToken } from '@angular/core';
import { SystelabVirtualKeyboardConstants } from './constants';

export const VIRTUAL_KEYBOARD_CONFIG = new InjectionToken<SystelabVirtualKeyboardConfig>('VIRTUAL_KEYBOARD_CONFIG');

export interface SystelabVirtualKeyboardConfig {
    layout?: SystelabVirtualKeyboardConstants.Layouts;
    inputMethod?: SystelabVirtualKeyboardConstants.InputMethods;
    showIcon?: boolean;
    showOnMouseClick?: boolean;
}
