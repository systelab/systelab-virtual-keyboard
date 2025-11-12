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
    DOCUMENT,
    ElementRef,
    EventEmitter,
    HostListener,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    Renderer2
} from '@angular/core';


import { SystelabVirtualKeyboardComponent } from './systelab-virtual-keyboard.component';
import { SystelabVirtualKeyboardOverlayService } from './systelab-virtual-keyboard-overlay.service';
import { SystelabVirtualKeyboardConstants } from './systelab-virtual-keyboard.constants';
import { SystelabVirtualKeyboard } from './systelab-virtual-keyboard.public';

@Directive({
    selector: 'input[vkEnabled], textarea[vkEnabled]',
    standalone: false,
})
export class SystelabVirtualKeyboardDirective implements OnInit, AfterViewInit, OnDestroy {
    @HostListener('window:touchmove', ['$event'])
    @HostListener('window:touchend', ['$event'])
    @HostListener('window:wheel', ['$event'])
    @HostListener('document:scroll', ['$event'])
    onDocumentScroll() {
        if (!this.vkEnabled) {
            return;
        }
        this.overlayService.updatePosition();
    }

    @HostListener('click', ['$event'])
    onClick(): void {
        if (!this.vkEnabled || !this.config.showOnMouseClick) {
            return;
        }

        this.closePanel();
        this.overlayService.setClickAlreadyHandled();
        this.openPanel();
    }

    @HostListener('touchend', ['$event'])
    onTouchEnd(): void {
        if (!this.vkEnabled) {
            return;
        }

        this.closePanel();
        this.overlayService.setTouchEndAlreadyHandled();
        this.openPanel();
    }

    private enabled = false;

    @Input()
    set vkEnabled(enabled: boolean | string) {
        if (typeof enabled === 'string') {
            this.enabled = true;
        } else {
            this.enabled = enabled;
        }
    };

    get vkEnabled(): boolean {
        return this.enabled;
    }

    private fixedBottom = false;

    @Input()
    get vkFixedBottom(): boolean {
        return this.fixedBottom;
    }

    set vkFixedBottom(fixedBottom: boolean | string) {
        if (typeof fixedBottom === 'string') {
            this.fixedBottom = true;
        } else {
            this.fixedBottom = fixedBottom;
        }
    }

    private debug = false;

    @Input()
    get vkDebug(): boolean {
        return this.debug;
    }

    set vkDebug(debug: boolean) {
        this.debug = debug;
    }

    private config: SystelabVirtualKeyboard.Config;

    @Input()
    get vkConfig(): SystelabVirtualKeyboard.Config {
        return this.config;
    }

    set vkConfig(config: SystelabVirtualKeyboard.Config) {
        this.config = config;
    }

    private panelRef!: ComponentRef<SystelabVirtualKeyboardComponent>;
    private showKeyboardButtonElement: HTMLElement;

    @Output() vkOnKeyPress = new EventEmitter<string>();

    constructor(
        private readonly elementRef: ElementRef<HTMLInputElement>,
        private readonly overlayService: SystelabVirtualKeyboardOverlayService,
        private readonly renderer: Renderer2,
        @Inject(DOCUMENT) private readonly document: any,
        @Optional() @Inject(SystelabVirtualKeyboardConstants.VIRTUAL_KEYBOARD_CONFIG) private readonly virtualKeyboardConfig: SystelabVirtualKeyboard.Config,
    ) {
        this.config = this.virtualKeyboardConfig;
    }

    ngOnInit() {
        if (this.config?.showIcon) {
            this.attachKeyboardIcon();
        }
    }

    ngAfterViewInit() {
        if (this.vkEnabled && this.config?.showIcon) {
            const keyboardIcon = this.elementRef.nativeElement.parentElement.querySelector('i');
            keyboardIcon.addEventListener('click', this.togglePanel.bind(this));
        }
    }

    ngOnDestroy(): void {
        if (this.vkEnabled && this.config?.showIcon) {
            const keyboardIcon = this.elementRef.nativeElement.parentElement.querySelector('i');
            keyboardIcon.removeEventListener('click', this.togglePanel.bind(this));
        }
        this.overlayService.destroy();
    }

    public close(): void {
        this.closePanel();
    }

    private togglePanel(): void {
        if (!this.vkEnabled) {
            return;
        }
        if (this.overlayService.isOpen()) {
            this.closePanel();
        } else {
            this.openPanel();
        }
    }

    private openPanel(): void {
        if (!this.vkEnabled) {
            return;
        }
        if (this.overlayService.isCreated()) {
            this.overlayService.destroy();
        }
        if (this.overlayService.hasAttached()) {
            return;
        }

        const currentLayout = this.getLayout(this.elementRef.nativeElement);

        this.panelRef = this.overlayService.create(this.inputOrigin(), this.showKeyboardButtonElement, this.vkFixedBottom, currentLayout);
        this.panelRef.instance.debug = this.vkDebug;
        this.panelRef.instance.setActiveInput(this.elementRef.nativeElement);
        this.panelRef.instance.setLayout(currentLayout);
        this.panelRef.instance.config = this.config;
        this.panelRef.instance.closePanel.subscribe(() => this.closePanel());

        this.panelRef.instance.keyPressed.subscribe((key: string) => this.vkOnKeyPress.emit(key));
    }

    private getLayout(activeInputElement: HTMLInputElement | HTMLTextAreaElement): SystelabVirtualKeyboard.Layouts {
        if (this.config?.hasOwnProperty('layout')) {
            return this.config.layout;
        }
        if (this.isInputAlphabetic(activeInputElement)) {
            return SystelabVirtualKeyboard.Layouts.AlphaNumeric;
        } else if (this.isInputNumeric(activeInputElement)) {
            return SystelabVirtualKeyboard.Layouts.Numeric;
        } else {
            return SystelabVirtualKeyboard.Layouts.AlphaNumeric;
        }
    }

    private isInputAlphabetic(activeInputElement: HTMLInputElement | HTMLTextAreaElement): boolean {
        const inputMode = this.getInputMode(activeInputElement);
        return inputMode &&  [SystelabVirtualKeyboardConstants.InputModes.text, SystelabVirtualKeyboardConstants.InputModes.password].some((i) => i === inputMode);
    }

    private isInputNumeric(activeInputElement: HTMLInputElement | HTMLTextAreaElement): boolean {
        const inputMode = this.getInputMode(activeInputElement);
        return inputMode && [SystelabVirtualKeyboardConstants.InputModes.numeric].some((i) => i === inputMode);
    }

    private getInputMode(activeInputElement: HTMLInputElement | HTMLTextAreaElement): string {
        return activeInputElement?.inputMode ?? activeInputElement?.type;
    }

    private closePanel(): void {
        this.overlayService.destroy();
    }

    private inputOrigin(): HTMLInputElement {
        return this.elementRef.nativeElement;
    }

    private attachKeyboardIcon() {
        if (this.vkEnabled) {
            const child = this.document.createElement('i');
            child.classList.add('fa');
            child.classList.add('fa-keyboard');
            child.classList.add('systelab-virtual-keyboard__show-button');
            this.renderer.appendChild(this.elementRef.nativeElement.parentElement, child);
            this.showKeyboardButtonElement = child;
        }
    }
}
