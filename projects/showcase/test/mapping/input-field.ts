import { ElementFinder, Widget } from 'systelab-components-wdio-test';
import { VirtualKeyboard } from './virtual-keyboard';


export class InputField extends Widget {
    public async tap(): Promise<void> {
        return this.getInputText().tap();
    }

    public async click(): Promise<void> {
        return this.getInputText().click();
    }

    public async clear(): Promise<void> {
        const currentText = await this.getText();
        for (let i = 0; i < currentText.length; i++) {
            await VirtualKeyboard.get().clickBackspace();
        }
    }

    public async setText(text: string): Promise<void> {
        return this.getInputText().write(text);
    }

    public async getText(): Promise<string> {
        return this.getInputText().getValue();
    }

    public async getBoundingRect(): Promise<{x: number, y: number, width: number, height: number}> {
        return this.getInputText().getBoundingRect();
    }

    public async isVirtualKeyboardIconPresent(): Promise<boolean> {
        return this.getVirtualKeyboardIcon().isPresent();
    }

    public async clickVirtualKeyboardIcon(): Promise<void> {
        return this.getVirtualKeyboardIcon().click();
    }

    private getInputText(): ElementFinder {
        return this.elem.byTagName("input");
    }

    private getVirtualKeyboardIcon(): ElementFinder {
        return this.elem.byCSS(".virtual-keyboard-show-button");
    }
}
