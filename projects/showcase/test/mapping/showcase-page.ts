import { BasePage } from 'systelab-components-wdio-test';
import { InputField } from './input-field';


export class ShowcasePage extends BasePage {
    private static instance: ShowcasePage;

    public static get(): ShowcasePage {
      return this.instance ? this.instance : (this.instance = new ShowcasePage());
    }
  
    constructor() {
      super('app-root');
    }

    public getAlphanumericalField(): InputField {
      return new InputField(this.byId('alphanumeric-field'));
    }

    public getNumericField(): InputField {
      return new InputField(this.byId('numeric-field'));
    }

    public getNumericDefaultLayoutField(): InputField {
      return new InputField(this.byId('numeric-default-layout-field'));
    }
    
    public getFixedBottomField(): InputField {
      return new InputField(this.byId('fixed-bottom-field'));
    }

    public async clickOnBackground(): Promise<void> {
      await this.byCSS('section').click();
    }
}
