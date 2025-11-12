import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Inject,
    Optional,
    Output
} from '@angular/core';
import { SimpleKeyboard } from 'simple-keyboard';
import { SystelabVirtualKeyboardConstants } from './systelab-virtual-keyboard.constants';
import { KeyboardOptions } from 'simple-keyboard/build/interfaces';
import { SystelabVirtualKeyboard } from './systelab-virtual-keyboard.public';

@Component({
    selector: 'systelab-virtual-keyboard.component',
    standalone: true,
    imports: [],
    templateUrl: './systelab-virtual-keyboard.component.html',
})
export class SystelabVirtualKeyboardComponent implements AfterViewInit {
    @HostListener('window:keyup', ['$event'])
    handleKeyUp(event: KeyboardEvent): void {
        if (event.isTrusted) {
            this.caretEventHandler(event);
        }
    }

    @HostListener('window:pointerup', ['$event'])
    @HostListener('window:mouseup', ['$event'])
    handleMouseUp(event: PointerEvent): void {
        this.caretEventHandler(event);
    }

    get maxLength(): number {
        return this.activeInputElement?.maxLength ?? -1;
    }

    get isTextarea(): boolean {
        return this.activeInputElement?.type === 'textarea';
    }

    public debug = false;
    public config: SystelabVirtualKeyboard.Config;
    private selectedLayout: SystelabVirtualKeyboard.Layouts | 'default' = 'default';
    private keyboard: SimpleKeyboard;
    private caretPosition: number | null = null;
    private caretPositionEnd: number | null = null;
    private activeInputElement!: HTMLInputElement | HTMLTextAreaElement | null;

    private shiftPressed = false;
    private specialKeysAlwaysUppercase = false;
    private capsLockOn = false;

    @Output() closePanel = new EventEmitter<void>();
    @Output() keyPressed = new EventEmitter<string>();

    constructor(
        private readonly elementRef: ElementRef<HTMLInputElement>,
        @Optional() @Inject(SystelabVirtualKeyboardConstants.VIRTUAL_KEYBOARD_CONFIG) private readonly virtualKeyboardConfig: SystelabVirtualKeyboard.Config) {}

    ngAfterViewInit() {
        const keyboardOptions: KeyboardOptions = this.prepareKeyboardConfig();
        this.keyboard = new SimpleKeyboard('.simple-keyboard', keyboardOptions);
        this.setButtonClasses();
        this.setLayout(this.selectedLayout);
    }

    public setActiveInput(input: HTMLInputElement | HTMLTextAreaElement): void {
        this.activeInputElement = input;

        if (this.debug) {
            const inputType = this.activeInputElement?.type;
            console.log('Layout:', `${inputType}_${this.selectedLayout}`);
        }

        const { selectionStart, selectionEnd } = this.activeInputElement;
        this.setCaretPosition(selectionStart, selectionEnd);

        if (this.debug) {
            console.log('Caret start at:', this.caretPosition, this.caretPositionEnd);
        }
        this.focusActiveInput();
    }

    public setLayout(layout: SystelabVirtualKeyboard.Layouts | 'default'): void {
        this.selectedLayout = layout;
        if (this.keyboard) {
            this.keyboard.setOptions({
                layoutName: layout,
            });

            if (layout === SystelabVirtualKeyboard.Layouts.AlphaNumericUppercase || layout === SystelabVirtualKeyboard.Layouts.AlphaNumericUppercaseShift) {
                this.specialKeysAlwaysUppercase = true;
                this.addUppercaseClass();
            }
        }
    }

    private prepareKeyboardConfig(): KeyboardOptions {
        let keyboardOptions: KeyboardOptions = {
            onKeyPress: (button) => this.handleKeyPress(button),
            mergeDisplay: true,
            theme: 'hg-theme-default hg-layout-default systelab-virtual-keyboard-theme',
            display: {
                [SystelabVirtualKeyboard.Buttons.Backspace]: 'back',
                [SystelabVirtualKeyboard.Buttons.Enter]: this.config?.actionText ?? 'enter',
                [SystelabVirtualKeyboard.Buttons.Lock]: 'lock',
            },
            buttonTheme: this.buildButtonThemes(),
            layout: SystelabVirtualKeyboardConstants.LayoutDefinitions,
        };

        if (this.virtualKeyboardConfig?.hasOwnProperty('inputMethod')) {
            if (this.virtualKeyboardConfig.inputMethod === SystelabVirtualKeyboard.InputMethods.onlyMouseEvents) {
                keyboardOptions = {
                    ...keyboardOptions,
                    useMouseEvents: true,
                }
            } else if (this.virtualKeyboardConfig.inputMethod === SystelabVirtualKeyboard.InputMethods.onlyTouchEvents) {
                keyboardOptions = {
                    ...keyboardOptions,
                    useTouchEvents: true,
                }
            }
        }

        return keyboardOptions;
    }

    private buildButtonThemes(): { class: string; buttons: string }[] {
        return [
            {
                class: 'virtual-keyboard-delete-button',
                buttons: `${SystelabVirtualKeyboard.Buttons.Backspace}`,
            },
            {
                class: this.config?.actionText ? 'virtual-keyboard-enter-button virtual-keyboard-enter-button--action' : 'virtual-keyboard-enter-button',
                buttons: `${SystelabVirtualKeyboard.Buttons.Enter}`,
            },
            {
                class: 'virtual-keyboard-function-button',
                buttons: `${SystelabVirtualKeyboard.Buttons.Shift} ${SystelabVirtualKeyboard.Buttons.Lock}`,
            }
        ]
    }

    private setButtonClasses(): void {
        this.keyboard.addButtonTheme(SystelabVirtualKeyboard.Buttons.Shift, 'virtual-keyboard-shift-button');
    }

    private handleKeyPress(button: string, e?: Event): void {
        if (this.debug) {
            console.log('Key press:', button);
        }

        if (button.startsWith('&') && button.length > 1) {
            button = new DOMParser().parseFromString(button, 'text/html').body.textContent;
        }

        this.keyPressed.emit(button);

        if (button === SystelabVirtualKeyboard.Buttons.Shift ) {
            this.shiftPressed = !this.shiftPressed;
            this.toggleShiftLayout();
            if (this.shiftPressed) {
                this.keyboard.addButtonTheme(SystelabVirtualKeyboard.Buttons.Shift, 'virtual-keyboard-shift-active');
                this.addUppercaseClass();
            } else {
                this.keyboard.removeButtonTheme(SystelabVirtualKeyboard.Buttons.Shift, 'virtual-keyboard-shift-active');
                this.removeUppercaseClass();
            }
        } else if (button === SystelabVirtualKeyboard.Buttons.Lock) {
            this.capsLockOn = !this.capsLockOn;
            this.toggleShiftLayout();
            if (this.capsLockOn) {
                this.keyboard.addButtonTheme(SystelabVirtualKeyboard.Buttons.Lock, 'virtual-keyboard-lock-active');
                this.addUppercaseClass();
            } else {
                this.keyboard.removeButtonTheme(SystelabVirtualKeyboard.Buttons.Lock, 'virtual-keyboard-lock-active');
                this.removeUppercaseClass();
            }
        } else if (button === SystelabVirtualKeyboard.Buttons.Done) {
            this.closePanel.emit();
            e?.stopPropagation();
            e?.preventDefault();
            return;
        }

        if (!this.isAcceptedNonStandardButton(button) && !this.isStandardButton(button)) {
            return;
        }

        const output = this.handleButtonOutput(button);

        if (this.activeInputElement) {
            this.activeInputElement.value = output;

            if (this.debug) {
                console.log('Caret at:', this.caretPosition, this.caretPositionEnd, 'Button', e);
            }
        }

        this.dispatchEvents(button);

        if (this.shiftPressed) {
            this.toggleShiftLayout();
            this.removeUppercaseClass();
        }
        this.shiftPressed = false;
        this.keyboard.removeButtonTheme(SystelabVirtualKeyboard.Buttons.Shift, 'virtual-keyboard-shift-active');
    }

    private addUppercaseClass(): void {
        this.keyboard.addButtonTheme(SystelabVirtualKeyboard.Buttons.Shift, 'virtual-keyboard-uppercase');
        this.keyboard.addButtonTheme(SystelabVirtualKeyboard.Buttons.Lock, 'virtual-keyboard-uppercase');
        this.keyboard.addButtonTheme(SystelabVirtualKeyboard.Buttons.Tab, 'virtual-keyboard-uppercase');
        this.keyboard.addButtonTheme(SystelabVirtualKeyboard.Buttons.Backspace, 'virtual-keyboard-uppercase');
        this.keyboard.addButtonTheme(SystelabVirtualKeyboard.Buttons.Enter, 'virtual-keyboard-uppercase');
    }

    private removeUppercaseClass(): void {
        if (this.specialKeysAlwaysUppercase) {
            return;
        }
        this.keyboard.removeButtonTheme(SystelabVirtualKeyboard.Buttons.Shift, 'virtual-keyboard-uppercase');
        this.keyboard.removeButtonTheme(SystelabVirtualKeyboard.Buttons.Lock, 'virtual-keyboard-uppercase');
        this.keyboard.removeButtonTheme(SystelabVirtualKeyboard.Buttons.Tab, 'virtual-keyboard-uppercase');
        this.keyboard.removeButtonTheme(SystelabVirtualKeyboard.Buttons.Backspace, 'virtual-keyboard-uppercase');
        this.keyboard.removeButtonTheme(SystelabVirtualKeyboard.Buttons.Enter, 'virtual-keyboard-uppercase');
    }

    private handleButtonOutput(button: string): string {
        const commonParams: [number, number, boolean] = this.getCommonParams();
        let output = this.activeInputElement?.value || '';
        if (!this.isStandardButton(button)) {
            if (button === SystelabVirtualKeyboard.Buttons.Backspace) {
                output = this.removeAt(output, ...commonParams);
            } else if (button === SystelabVirtualKeyboard.Buttons.Space) {
                output = this.addStringAt(output, ' ', ...commonParams);
            } else if (button === SystelabVirtualKeyboard.Buttons.Tab) {
                // Do nothing for tab
            } else if (button === SystelabVirtualKeyboard.Buttons.Enter) {
                if (this.isTextarea) {
                    output = this.addStringAt(output, '\n', ...commonParams);
                }
            } else {
                return;
            }
        } else {
            output = this.addStringAt(output, button, ...commonParams);
        }

        return output;
    }

    private getCommonParams(): [number, number, boolean] {
        return [this.caretPosition || 0, this.caretPositionEnd || 0, true];
    }

    private isAcceptedNonStandardButton(button: string): boolean {
        return [
            SystelabVirtualKeyboard.Buttons.Backspace.toString(),
            SystelabVirtualKeyboard.Buttons.Space.toString(),
            SystelabVirtualKeyboard.Buttons.Tab.toString(),
            SystelabVirtualKeyboard.Buttons.Enter.toString(),
        ].includes(button);
    }

    private dispatchEvents(button: string) {
        const {key, code} = this.convertFromButtonToCode(button);

        const eventInit: KeyboardEventInit = {
            bubbles: true,
            cancelable: true,
            shiftKey: this.selectedLayout === SystelabVirtualKeyboard.Layouts.AlphaNumericShift,
            key: key,
            code: code,
            location: 0,
        };
        // Simulate all needed events on base element
        this.activeInputElement?.dispatchEvent(new KeyboardEvent('keydown', eventInit));
        this.activeInputElement?.dispatchEvent(new KeyboardEvent('keypress', eventInit));
        this.activeInputElement?.dispatchEvent(new Event('input', {bubbles: true}));
        this.activeInputElement?.dispatchEvent(new KeyboardEvent('keyup', eventInit));
    }

    /*
     * AUXILIARY METHODS
     * */
    private convertFromButtonToCode(button: string): { key: string; code: string } {
        let key: string;
        let code: string;
        if (button.includes('{') && button.includes('}')) {
            // Capitalize name
            key = button.slice(1, button.length - 1).toLowerCase();
            key = key.charAt(0).toUpperCase() + key.slice(1);
            code = key;

            // Fix to standard key code
            if (code.toLowerCase() === SystelabVirtualKeyboard.Buttons.Backspace.slice(1, SystelabVirtualKeyboard.Buttons.Backspace.length - 1).toLowerCase()) {
                code = 'Backspace';
            }
        } else {
            key = button;
            code = Number.isInteger(Number(button)) ? `Digit${button}` : `Key${button.toUpperCase()}`;
        }

        return {key, code};
    }

    private toggleShiftLayout(): void {
        const currentLayout = this.keyboard.options.layoutName;
        let selectedLayout: SystelabVirtualKeyboard.Layouts;

        switch (currentLayout) {
            case SystelabVirtualKeyboard.Layouts.AlphaNumeric:
            case SystelabVirtualKeyboard.Layouts.AlphaNumericShift:
                selectedLayout = currentLayout === SystelabVirtualKeyboard.Layouts.AlphaNumeric ? SystelabVirtualKeyboard.Layouts.AlphaNumericShift : SystelabVirtualKeyboard.Layouts.AlphaNumeric;
                break;

            case SystelabVirtualKeyboard.Layouts.AlphaNumericUppercase:
            case SystelabVirtualKeyboard.Layouts.AlphaNumericUppercaseShift:
                selectedLayout = currentLayout === SystelabVirtualKeyboard.Layouts.AlphaNumericUppercase ? SystelabVirtualKeyboard.Layouts.AlphaNumericUppercaseShift : SystelabVirtualKeyboard.Layouts.AlphaNumericUppercase;
                break;

            case SystelabVirtualKeyboard.Layouts.Numeric:
            case SystelabVirtualKeyboard.Layouts.NumericShift:
                selectedLayout = currentLayout === SystelabVirtualKeyboard.Layouts.Numeric ? SystelabVirtualKeyboard.Layouts.NumericShift : SystelabVirtualKeyboard.Layouts.Numeric;
                break;
            default:
        }

        if (selectedLayout) {
            this.setLayout(selectedLayout);
        }
    }

    private isStandardButton(button: string) {
        return button && !(button.startsWith('{') && button.endsWith('}'));
    }

    /*
     * OUTPUT STRING METHODS
     * */
    private removeAt(source: string, position = source.length, positionEnd = source.length, moveCaret = false): string {
        if (position === 0 && positionEnd === 0) {
            return source;
        }

        let output: string;

        if (position === positionEnd) {
            if (position && position >= 0) {
                output = source.slice(0, position - 1) + source.slice(position);
                if (moveCaret) {
                    this.updateCaretPosition(1, true);
                }
            } else {
                output = source.slice(0, -1);
                if (moveCaret) {
                    this.updateCaretPosition(1, true);
                }
            }
        } else {
            output = source.slice(0, position) + source.slice(positionEnd);
            if (moveCaret) {
                this.setCaretPosition(position);
            }
        }

        return output;
    }

    private addStringAt(source: string, str: string, position = source.length, positionEnd = source.length, moveCaret = false): string {
        if (this.maxLength !== -1 && source.length >= this.maxLength) {
            return source;
        }

        let output: string;

        if (!position && position !== 0) {
            output = source + str;
        } else {
            output = [source.slice(0, position), str, source.slice(positionEnd)].join('');
            if (moveCaret) {
                this.updateCaretPosition(str.length, false);
            }
        }

        return output;
    }

    /*
       * CARET METHODS
       * */
    private caretEventHandler(event: any) {
        let targetTagName = '';
        if (event.target.tagName) {
            targetTagName = event.target.tagName.toLowerCase();
        }

        const isTextInput =
            targetTagName === 'textarea' ||
            (targetTagName === 'input' && ['text', 'search', 'email', 'password', 'url', 'tel'].includes(event.target.type));

        const isKeyboard =
            event.target === this.elementRef.nativeElement || (event.target && this.elementRef.nativeElement.contains(event.target));

        if (isTextInput && this.activeInputElement == event.target) {
            /**
             * Tracks current cursor position
             * As keys are pressed, text will be added/removed at that position within the input.
             */
            this.setCaretPosition(event.target.selectionStart, event.target.selectionEnd);

            if (this.debug) {
                console.log('Caret at:', this.caretPosition, this.caretPositionEnd, event?.target.tagName.toLowerCase(), event);
            }
        } else if (event.type === 'pointerup' && this.activeInputElement === document.activeElement) {
            return;
        } else if (!isKeyboard && event?.type !== 'selectionchange') {
            /**
             * we must ensure caretPosition doesn't persist once reactivated.
             */
            this.setCaretPosition(null);

            if (this.debug) {
                console.log(`Caret position reset due to "${event?.type}" event`, event);
            }
        }
    }

    private focusActiveInput(): void {
        this.activeInputElement?.focus();
        this.activeInputElement?.setSelectionRange(
            this.caretPosition,
            this.caretPositionEnd
        );
    }

    private updateCaretPosition(length: number, minus = false) {
        const newCaretPos = this.computeNewCaretPosition(length, minus);
        this.setCaretPosition(newCaretPos);
        // Scroll to bottom
        setTimeout(() => {
            this.activeInputElement?.scrollTo({
                top: this.activeInputElement.scrollHeight,
            } as ScrollToOptions);
        });
    }

    private computeNewCaretPosition(length: number, minus = false) {
        let caretPosition = this.caretPosition;

        if (caretPosition != null) {
            if (minus) {
                if (caretPosition > 0) caretPosition = caretPosition - length;
            } else {
                caretPosition = caretPosition + length;
            }
        }
        return caretPosition;
    }

    private setCaretPosition(position: number | null, endPosition = position): void {
        this.caretPosition = position;
        this.caretPositionEnd = endPosition;
    }
}
