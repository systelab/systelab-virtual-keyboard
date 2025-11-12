import { BasePage, ElementArrayFinder, ElementFinder } from 'systelab-components-wdio-test';
import { SystelabVirtualKeyboard } from '../../../systelab-virtual-keyboard/src/lib/systelab-virtual-keyboard.public';


export class VirtualKeyboard extends BasePage {
    private static instance: VirtualKeyboard;

    public static get(): VirtualKeyboard {
        return this.instance ? this.instance : (this.instance = new VirtualKeyboard());
    }

    constructor() {
        super('systelab-virtual-keyboard');
    }

    public async isPresent(): Promise<boolean> {
        return this.getElementFinder().isPresent();
    }

    public async getBoundingRect(): Promise<{x: number, y: number, width: number, height: number}> {
        return this.getElementFinder().getBoundingRect();
    }

    public async getRowCount(): Promise<number> {
        return this.getElementFinder().allByCSS('div.hg-row').count();
    }

    public async getRowKeys(rowIndex: number): Promise<string[]> {
        const keys: string[] = [];
        const keysSelector: ElementArrayFinder = this.getElementFinder().allByCSS('div.hg-row').get(rowIndex).allByCSS('div.hg-button');
        const keysCount: number = await keysSelector.count();
        for (let i = 0; i < keysCount; i++) {
            keys.push(await keysSelector.get(i).getAttribute('data-skbtn'));
        }

        return keys;
    }

    public async tapOnKeys(text: string): Promise<void> {
        const keys: string[] = text.split('');
        for (let i = 0; i < keys.length; i++) {
            await this.tapOnKey(keys[i]);
        }
    }

    public async tapOnBackspace(): Promise<void> {
        await this.tapOnKey(SystelabVirtualKeyboard.Buttons.Backspace);
    }

    public async tapOnTab(): Promise<void> {
        await this.tapOnKey(SystelabVirtualKeyboard.Buttons.Tab);
    }

    public async tapOnCapsLock(): Promise<void> {
        await this.tapOnKey(SystelabVirtualKeyboard.Buttons.Lock);
    }

    public async tapOnShift(): Promise<void> {
        await this.tapOnKey(SystelabVirtualKeyboard.Buttons.Shift);
    }

    public async tapOnEnter(): Promise<void> {
        await this.tapOnKey(SystelabVirtualKeyboard.Buttons.Enter);
    }

    public async tapOnSpace(): Promise<void> {
        await this.tapOnKey(SystelabVirtualKeyboard.Buttons.Space);
    }

    public async tapOnKey(keyValue: string): Promise<void> {
        const keySelector: ElementFinder = this.getElementFinder().byCSS(`[data-skbtn='${keyValue}']`);
        await keySelector.click(); // Hack as current implementation of WDIO tap is not working
    }
}
