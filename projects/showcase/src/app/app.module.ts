import { NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SystelabVirtualKeyboardModule } from 'systelab-virtual-keyboard';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    imports: [BrowserModule, RouterOutlet, SystelabVirtualKeyboardModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
