import { BasePage, ElementArrayFinder, ElementFinder } from 'systelab-components-wdio-test';


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

    public async clickKeys(text: string): Promise<void> {
        const keys: string[] = text.split('');
        for (let i = 0; i < keys.length; i++) {
            await this.clickKey(keys[i]);
        }
    }

    public async clickBackspace(): Promise<void> {
        await this.clickKey('{bksp}');
    }

    public async clickTab(): Promise<void> {
        await this.clickKey('{tab}');
    }

    public async clickCapsLock(): Promise<void> {
        await this.clickKey('{lock}');
    }

    public async clickShift(): Promise<void> {
        await this.clickKey('{shift}');
    }

    public async clickEnter(): Promise<void> {
        await this.clickKey('{enter}');
    }

    public async clickSpace(): Promise<void> {
        await this.clickKey('{space}');
    }

    public async clickKey(keyValue: string): Promise<void> {
        const keySelector: ElementFinder = this.getElementFinder().byCSS(`[data-skbtn='${keyValue}']`);
        await keySelector.click();
    }
}
