import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystelabVirtualKeyboardDirective } from './systelab-virtual-keyboard.directive';
import { OverlayModule } from '@angular/cdk/overlay';
import { SystelabVirtualKeyboardConfig, VIRTUAL_KEYBOARD_CONFIG } from './systelab-virtual-keyboard.config';
import { SystelabVirtualKeyboardOverlayService } from './systelab-virtual-keyboard-overlay.service';

export const factory = () => {
    const systelabVirtualKeyboardModuleCreated = (factory as any)._systelabVirtualKeyboardModuleCreated || false;
    if (systelabVirtualKeyboardModuleCreated) {
        throw new Error('SystelabVirtualKeyboardModuleCreated.forRoot imported to many times');
    }
    (factory as any)._systelabVirtualKeyboardModuleCreated = true;
};

@NgModule({
    imports: [CommonModule, OverlayModule],
    declarations: [SystelabVirtualKeyboardDirective],
    exports: [SystelabVirtualKeyboardDirective],
})
export class SystelabVirtualKeyboardModule {
    public static forRoot(conf?: SystelabVirtualKeyboardConfig): ModuleWithProviders<SystelabVirtualKeyboardModule> {
        return {
            ngModule: SystelabVirtualKeyboardModule,
            providers: [
                SystelabVirtualKeyboardOverlayService,
                {
                    provide: VIRTUAL_KEYBOARD_CONFIG, useValue: conf
                }
            ]
        };
    }

    public static forChild(): ModuleWithProviders<SystelabVirtualKeyboardModule> {
        return {
            ngModule: SystelabVirtualKeyboardModule,
            providers: [],
        };
    }
}
