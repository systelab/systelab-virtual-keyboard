import { ElementFinder, Widget } from 'systelab-components-wdio-test';


export class InputField extends Widget {
    public async clear(): Promise<void> {
        return this.getInputText().clear();
    }

    public async setText(text: string): Promise<void> {
        return this.getInputText().write(text);
    }

    public async getText(): Promise<string> {
        return this.getInputText().getValue();
    }

    public async openVirtualKeyboard(): Promise<void> {
        return this.elem.byCSS(".virtual-keyboard-show-button").click();
    }

    public async closeVirtualKeyboard(): Promise<void> {
        return this.elem.byCSS(".virtual-keyboard-show-button").click();
    }

    public async getBoundingRect(): Promise<{x: number, y: number, width: number, height: number}> {
        return this.getInputText().getBoundingRect();
    }

    private getInputText(): ElementFinder {
        return this.elem.byTagName("input");
    }
}
