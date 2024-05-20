import { ElementFinder, Widget } from 'systelab-components-wdio-test';
import { BoundingRect } from '../model/bounding-rect.model';
import { Location } from '../model/location.model';
import { Size } from '../model/size.model';


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

    public async getBoundingRect(): Promise<BoundingRect> {
        const rect = browser.execute((selector) => {
            return document.querySelector(selector).getBoundingClientRect();
        }, this.getElement().getLocator().selector);
        return rect;
    }

    public async getLocation(): Promise<Location> {
        const inputText = await this.getInputText().findElement();
        return inputText.getLocation();
    }

    public async getSize(): Promise<Size> {
        const inputText = await this.getInputText().findElement();
        return inputText.getSize();
    }

    private getInputText(): ElementFinder {
        return this.elem.byTagName("input");
    }
}
