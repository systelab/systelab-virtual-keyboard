import { Component } from '@angular/core';
import {
  SystelabVirtualKeyboardConfig,
  SystelabVirtualKeyboardLayouts
} from 'systelab-virtual-keyboard';

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

