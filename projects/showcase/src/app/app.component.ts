import { Component, OnInit } from '@angular/core';
import { SystelabVirtualKeyboardConfig, SystelabVirtualKeyboardLayouts } from 'systelab-virtual-keyboard';
import { environment } from '../environments/environment';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
    public vkConfigLayout: SystelabVirtualKeyboardConfig = {
        layout: SystelabVirtualKeyboardLayouts.numeric,
    }

    public vkConfigIcon: SystelabVirtualKeyboardConfig = {
        showIcon: true,
    }

    ngOnInit() {
        if (!environment.animationsEnabled) {
            const body = document.getElementsByTagName('body')[0];
            body.classList.add('wdio-disable-animations');
        }
    }
}

