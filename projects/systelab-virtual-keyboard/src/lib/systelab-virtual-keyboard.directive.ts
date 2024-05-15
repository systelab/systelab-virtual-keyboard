/*
 * Copyright (c) 2020 - 2024 - Instrumentation Laboratory Company and Systelab Technologies, SA. All rights reserved.
 * NOTICE:  All information contained herein is and remains the property of Instrumentation Laboratory Company and its
 * affiliates, if any.  The intellectual and technical concepts contained herein are proprietary to Instrumentation
 * Laboratory Company and its affiliates and may be covered by U.S. and foreign patents and patent applications, and/or
 * are protected by trade secret or copyright law. Dissemination of this information or reproduction of this material is
 * strictly forbidden unless prior written permission is Instrumentation Laboratory Company.
 */

import {
  AfterViewInit,
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';

import { DOCUMENT } from '@angular/common';

import { VirtualKeyboardInputTypes, VirtualKeyboardLayouts } from './constants';
import { SystelabVirtualKeyboardComponent } from './systelab-virtual-keyboard.component';
import { SystelabVirtualKeyboardOverlayService } from './systelab-virtual-keyboard-overlay.service';

@Directive({
  selector: 'input[vkEnabled], textarea[vkEnabled]',
})
export class SystelabVirtualKeyboardDirective implements OnInit, AfterViewInit, OnDestroy {
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent | TouchEvent) {
    const simpleKeyboardElement = document.querySelector('.simple-keyboard');
    const showKeyboardButtonClicked = (event.target as HTMLElement)?.classList.contains('virtual-keyboard-show-button');
    if (
      !simpleKeyboardElement?.contains(event.target as Node) &&
      !this.elementRef?.nativeElement?.contains(event.target as Node) &&
      !this.showKeyboardButtonElement?.contains(event.target as Node) &&
      !showKeyboardButtonClicked
    ) {
      if (this.overlayService.isCreated()) {
        this.overlayService.destroy();
      }
    }
  }

  @HostListener('window:touchmove', ['$event'])
  @HostListener('window:touchend', ['$event'])
  @HostListener('window:wheel', ['$event'])
  onDocumentScroll() {
    if (this.overlayService.isCreated()) {
      // update position and size on scroll
    }
  }

  private enabled = false;
  @Input()
  set vkEnabled(enabled: boolean) {
    this.enabled = true;
  };
  get vkEnabled(): boolean {
    return this.enabled;
  }

  private fixedBottom = false;
  @Input()
  get vkFixedBottom(): boolean {
    return this.fixedBottom;
  }
  set vkFixedBottom(fixedBottom: boolean) {
    this.fixedBottom = fixedBottom;
  }

  private debug = false;
  @Input()
  get vkDebug(): boolean {
    return this.debug;
  }
  set vkDebug(debug: boolean) {
    this.debug = debug;
  }

  private panelRef!: ComponentRef<SystelabVirtualKeyboardComponent>;
  private showKeyboardButtonElement: HTMLElement;

  constructor(
    private readonly elementRef: ElementRef<HTMLInputElement>,
    private readonly overlayService: SystelabVirtualKeyboardOverlayService,
    private readonly renderer: Renderer2,
    @Inject(DOCUMENT) private readonly document: any,
  ) {}

  ngOnInit() {
    this.attachKeyboardIcon();
  }

  ngAfterViewInit() {
    if (this.vkEnabled) {
      const keyboardIcon = this.elementRef.nativeElement.parentElement.querySelector('i');
      keyboardIcon.addEventListener('click', this.togglePanel.bind(this));
    }
  }

  ngOnDestroy(): void {
    if (this.overlayService.isCreated()) {
      this.overlayService.destroy();
    }
  }

  private togglePanel(): void {
    if (this.overlayService.isOpen()) {
      this.closePanel();
    } else {
      this.openPanel();
    }
  }

  private openPanel(): void {
    if (this.overlayService.isCreated()) {
      this.overlayService.destroy();
    }
    if (this.overlayService.hasAttached()) {
      return;
    }

    const currentLayout = this.getLayout(this.elementRef.nativeElement);

    this.panelRef = this.overlayService.create(this.inputOrigin(), this.vkFixedBottom, currentLayout);
    this.panelRef.instance.debug = this.vkDebug;
    this.panelRef.instance.setActiveInput(this.elementRef.nativeElement);
    this.panelRef.instance.closePanel.subscribe(() => this.closePanel());
  }

  private getLayout(activeInputElement: HTMLInputElement | HTMLTextAreaElement): VirtualKeyboardLayouts {
    if (this.isInputAlphabetic(activeInputElement)) {
      return VirtualKeyboardLayouts.default;
    } else if (this.isInputNumeric(activeInputElement)) {
      return VirtualKeyboardLayouts.numeric;
    } else {
      return VirtualKeyboardLayouts.default;
    }
  }

  private isInputAlphabetic(activeInputElement: HTMLInputElement | HTMLTextAreaElement): boolean {
    const inputType = activeInputElement?.type;
    return inputType && [VirtualKeyboardInputTypes.text, VirtualKeyboardInputTypes.password].some((i) => i === inputType);
  }

  private isInputNumeric(activeInputElement: HTMLInputElement | HTMLTextAreaElement): boolean {
    const inputType = activeInputElement?.type;
    return inputType && [VirtualKeyboardInputTypes.number].some((i) => i === inputType);
  }

  private closePanel(): void {
    this.overlayService.destroy();
  }

  private inputOrigin(): any {
    return this.elementRef.nativeElement;
  }

  private attachKeyboardIcon() {
    if (this.vkEnabled) {
      const child = this.document.createElement('i');
      child.classList.add('fa');
      child.classList.add('fa-keyboard');
      child.classList.add('virtual-keyboard-show-button');
      this.renderer.appendChild(this.elementRef.nativeElement.parentElement, child);
      this.showKeyboardButtonElement = child;
    }
  }
}
