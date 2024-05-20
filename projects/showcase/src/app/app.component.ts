import { Component } from '@angular/core';
import {
  SystelabVirtualKeyboardConfig,
  SystelabVirtualKeyboardLayouts
} from 'systelab-virtual-keyboard';
import { environment } from '../environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public vkConfig: SystelabVirtualKeyboardConfig = {
    layout: SystelabVirtualKeyboardLayouts.numeric,
  }

  ngOnInit() {
    if (!environment.animationsEnabled) {
      const body = document.getElementsByTagName('body')[0];
      body.classList.add('wdio-disable-animations');
    }
  }
}

