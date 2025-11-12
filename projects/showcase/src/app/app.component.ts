import { Component, OnInit, ViewChild } from '@angular/core';
import { SystelabVirtualKeyboard, SystelabVirtualKeyboardDirective } from 'systelab-virtual-keyboard';
import { environment } from '../environments/environment';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: false,
})
export class AppComponent implements OnInit {
    @ViewChild('inputElement', { read: SystelabVirtualKeyboardDirective }) vkDirective!: SystelabVirtualKeyboardDirective;

    public vkEnabled: boolean = false;

    public vkConfigNumericLayout: SystelabVirtualKeyboard.Config = {
        layout: SystelabVirtualKeyboard.Layouts.Numeric,
    }

    public vkConfigNumericLayoutWithActionText: SystelabVirtualKeyboard.Config = {
        layout: SystelabVirtualKeyboard.Layouts.Numeric,
        actionText: 'apply',
    }

    public vkConfigAlphaNumericUppercaseLayout: SystelabVirtualKeyboard.Config = {
        layout: SystelabVirtualKeyboard.Layouts.AlphaNumericUppercase,
    }

    public vkConfigIcon: SystelabVirtualKeyboard.Config = {
        showIcon: true,
    }

    public vkConfigMouseClick: SystelabVirtualKeyboard.Config = {
        showOnMouseClick: true,
    }

    public backgroundClicked(): void {
        console.log('Background clicked!');
    }

    public keyPressed(key: string): void {
        if (key === SystelabVirtualKeyboard.Buttons.Enter) {
            console.log('Enter pressed');
            this.vkDirective.close();
        }
    }

    ngOnInit() {
        if (!environment.animationsEnabled) {
            const body = document.getElementsByTagName('body')[0];
            body.classList.add('wdio-disable-animations');
        }
    }
}

