import { InjectionToken } from '@angular/core';
import { SystelabVirtualKeyboardInputMethods, SystelabVirtualKeyboardLayouts } from './constants';

export const VIRTUAL_KEYBOARD_CONFIG = new InjectionToken<SystelabVirtualKeyboardConfig>('VIRTUAL_KEYBOARD_CONFIG');

export interface SystelabVirtualKeyboardConfig {
    layout?: SystelabVirtualKeyboardLayouts;
    inputMethod?: SystelabVirtualKeyboardInputMethods;
    showIcon?: boolean;
    showOnMouseClick?: boolean;
}
