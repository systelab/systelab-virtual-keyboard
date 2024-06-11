import { NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SystelabVirtualKeyboardConfig, SystelabVirtualKeyboardModule } from 'systelab-virtual-keyboard';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';


const virtualKeyboardConfig: SystelabVirtualKeyboardConfig = {}; // Use default configuration

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
