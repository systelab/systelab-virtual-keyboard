import { Component } from '@angular/core';
import {
  SystelabVirtualKeyboardConfig
} from '../../../systelab-virtual-keyboard/src/lib/systelab-virtual-keyboard.config';
import { SystelabVirtualKeyboardLayouts } from '../../../systelab-virtual-keyboard/src/lib/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public vkConfig: SystelabVirtualKeyboardConfig = {
    layout: SystelabVirtualKeyboardLayouts.numeric,
  }
}

