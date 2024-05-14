import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystelabVirtualKeyboardDirective } from './systelab-virtual-keyboard.directive';


@NgModule({
  imports: [CommonModule],
  declarations: [SystelabVirtualKeyboardDirective],
  exports: [SystelabVirtualKeyboardDirective],
})
export class SystelabVirtualKeyboardDirectiveModule {}
