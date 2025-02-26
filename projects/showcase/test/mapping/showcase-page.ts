import { BasePage } from 'systelab-components-wdio-test';
import { InputField } from './input-field.js';


export class ShowcasePage extends BasePage {
    private static instance: ShowcasePage;

    public static get(): ShowcasePage {
        return this.instance ? this.instance : (this.instance = new ShowcasePage());
    }

    constructor() {
        super('app-root');
    }

    public getAutoAlphanumericLayoutField(): InputField {
        return new InputField(this.byId('auto-alphanumeric-layout-field'));
    }

    public getAutoNumericLayoutField(): InputField {
        return new InputField(this.byId('auto-numeric-layout-field'));
    }

    public getManualNumericLayoutField(): InputField {
        return new InputField(this.byId('manual-numeric-layout-field'));
    }

    public getShowVirtualKeyboardIconField(): InputField {
        return new InputField(this.byId('show-virtual-keyboard-icon-field'));
    }

    public getShowOnMouseClickField(): InputField {
        return new InputField(this.byId('show-on-mouse-click-field'));
    }

    public getFixedBottomPositioningField(): InputField {
        return new InputField(this.byId('fixed-bottom-positioning-field'));
    }

    public async tapOnBackground(): Promise<void> {
        await this.byCSS('h1').tap();
    }
}
