import { Component, OnInit } from '@angular/core';
import { SystelabVirtualKeyboardConfig, SystelabVirtualKeyboardConstants } from 'systelab-virtual-keyboard';
import { environment } from '../environments/environment';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: false,
})
export class AppComponent implements OnInit {
    public vkEnabled: boolean = false;

    public vkConfigNumericLayout: SystelabVirtualKeyboardConfig = {
        layout: SystelabVirtualKeyboardConstants.Layouts.Numeric,
    }

    public vkConfigAlphaNumericUppercaseLayout: SystelabVirtualKeyboardConfig = {
        layout: SystelabVirtualKeyboardConstants.Layouts.AlphaNumericUppercase,
    }

    public vkConfigIcon: SystelabVirtualKeyboardConfig = {
        showIcon: true,
    }

    public vkConfigMouseClick: SystelabVirtualKeyboardConfig = {
        showOnMouseClick: true,
    }

    ngOnInit() {
        if (!environment.animationsEnabled) {
            const body = document.getElementsByTagName('body')[0];
            body.classList.add('wdio-disable-animations');
        }
    }
}

