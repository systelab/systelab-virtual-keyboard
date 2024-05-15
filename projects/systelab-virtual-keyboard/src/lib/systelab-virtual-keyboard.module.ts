import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystelabVirtualKeyboardDirective } from './systelab-virtual-keyboard.directive';
import { OverlayModule } from '@angular/cdk/overlay';


@NgModule({
  imports: [CommonModule, OverlayModule],
  declarations: [SystelabVirtualKeyboardDirective],
  exports: [SystelabVirtualKeyboardDirective],
})
export class SystelabVirtualKeyboardDirectiveModule {}
