import { InjectionToken } from '@angular/core';
import { SystelabVirtualKeyboardLayouts } from './constants';

export const VIRTUAL_KEYBOARD_CONFIG = new InjectionToken<SystelabVirtualKeyboardConfig>('VIRTUAL_KEYBOARD_CONFIG');

export interface SystelabVirtualKeyboardConfig {
  width?: number;
  layout?: SystelabVirtualKeyboardLayouts;
}
