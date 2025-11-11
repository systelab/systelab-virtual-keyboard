import { NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SystelabVirtualKeyboardModule } from 'systelab-virtual-keyboard';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { SystelabVirtualKeyboard } from '../../../systelab-virtual-keyboard/src/public-api';


const virtualKeyboardConfig: SystelabVirtualKeyboard.Config = {
    numericCloseOnEnter: true,
}; // Use default configuration

@NgModule({
    imports: [
        BrowserModule,
        RouterOutlet,
        SystelabVirtualKeyboardModule.forRoot(virtualKeyboardConfig),
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
