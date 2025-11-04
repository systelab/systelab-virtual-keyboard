import { Browser, ReportUtility, TestIdentification } from 'systelab-components-wdio-test';
import { ShowcasePage } from '../mapping/showcase-page';
import { VirtualKeyboard } from '../mapping/virtual-keyboard';
import { VersionUtility } from '../utils/version.util';
import { LayoutExpectation } from '../expectation/layout.expectation';


describe("AlphanumericUppercaseLayout", () => {
    beforeAll(async () => {
        await Browser.navigateToURL("/");
    });

    beforeEach(async() => {
        TestIdentification.setTmsLink("TC-AlphanumericUppercaseLayout");
        TestIdentification.setDescription("Checks if the AlphanumericUppercase layout of the virtual keyboard behaves as expected.");
        TestIdentification.setAppVersion(VersionUtility.getLibraryVersion());
        TestIdentification.captureEnvironment();
    });

    it("Tap on auto-configured AlphanumericUppercase layout input field", async () => {
        await ShowcasePage.get().getManualAlphaNumericUppercaseLayoutField().tap();

        await LayoutExpectation.expectAlphanumericUppercaseLayout();
    });

    it("Write 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' by tapping on virtual keyboard keys", async () => {
        await VirtualKeyboard.get().tapOnKeys('ABCDEFGHIJKLMNOPQRSTUVWXYZ');

        await ReportUtility.addExpectedResult("AlphanumericUppercase input displays 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'", async() => {
            expect(await ShowcasePage.get().getManualAlphaNumericUppercaseLayoutField().getText()).toEqual('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
        });
    });

    it("Press 3 times the backspace key on the virtual keyboard", async () => {
        await VirtualKeyboard.get().tapOnBackspace();
        await VirtualKeyboard.get().tapOnBackspace();
        await VirtualKeyboard.get().tapOnBackspace();

        await ReportUtility.addExpectedResult("AlphanumericUppercase input displays 'ABCDEFGHIJKLMNOPQRSTUVW'", async() => {
            expect(await ShowcasePage.get().getManualAlphaNumericUppercaseLayoutField().getText()).toEqual('ABCDEFGHIJKLMNOPQRSTUVW');
        });
    });

    it("Append '1234567890' by tapping on virtual keyboard keys", async () => {
        await VirtualKeyboard.get().tapOnKeys('1234567890');

        await ReportUtility.addExpectedResult("AlphanumericUppercase input displays 'ABCDEFGHIJKLMNOPQRSTUVW1234567890'", async() => {
            expect(await ShowcasePage.get().getManualAlphaNumericUppercaseLayoutField().getText()).toEqual('ABCDEFGHIJKLMNOPQRSTUVW1234567890');
        });
    });

    it("Clear input content and write some symbols by tapping on virtual keyboard keys", async () => {
        await ShowcasePage.get().getManualAlphaNumericUppercaseLayoutField().clear();
        await VirtualKeyboard.get().tapOnKeys("`-=;,./");

        await ReportUtility.addExpectedResult("AlphanumericUppercase input displays '`-=;,./'", async() => {
            expect(await ShowcasePage.get().getManualAlphaNumericUppercaseLayoutField().getText()).toEqual("`-=;,./");
        });
    });

    it("Tap on 'Caps Lock' virtual keyboard key to change layout to uppercase", async () => {
        await VirtualKeyboard.get().tapOnCapsLock();

        await LayoutExpectation.expectAlphanumericUppercaseShiftLayout();
    });

    it("Clear input content and write 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' by tapping on virtual keyboard keys", async () => {
        await ShowcasePage.get().getManualAlphaNumericUppercaseLayoutField().clear();
        await VirtualKeyboard.get().tapOnKeys('ABCDEFGHIJKLMNOPQRSTUVWXYZ');

        await ReportUtility.addExpectedResult("AlphanumericUppercase input displays 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'", async() => {
            expect(await ShowcasePage.get().getManualAlphaNumericUppercaseLayoutField().getText()).toEqual('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
        });
    });

    it("Clear again input content and write some other symbols by tapping on virtual keyboard keys", async () => {
        await ShowcasePage.get().getManualAlphaNumericUppercaseLayoutField().clear();
        await VirtualKeyboard.get().tapOnKeys('!@#$%#^*()_+[];');

        await ReportUtility.addExpectedResult("AlphanumericUppercase input displays '!@#$%#^*()_+[];'", async() => {
            expect(await ShowcasePage.get().getManualAlphaNumericUppercaseLayoutField().getText()).toEqual('!@#$%#^*()_+[];');
        });
    });

    it("Tap again on 'Caps Lock' to return to lowercase layout", async () => {
        await VirtualKeyboard.get().tapOnCapsLock();

        await LayoutExpectation.expectAlphanumericUppercaseLayout();
    });

    it("Tap on 'Shift' virtual keyboard key to change layout to uppercase for only once key", async () => {
        await VirtualKeyboard.get().tapOnShift();

        await LayoutExpectation.expectAlphanumericUppercaseShiftLayout();
    });

    it("Tap on 'S' virtual keyboard key and the lowercase layout is back", async() => {
        await VirtualKeyboard.get().tapOnKey('S');

        await LayoutExpectation.expectAlphanumericUppercaseLayout();
    })

    it("Clear again input content and write some text with a space and a tab by tapping on virtual keyboard keys", async () => {
        await ShowcasePage.get().getManualAlphaNumericUppercaseLayoutField().clear();
        await VirtualKeyboard.get().tapOnKeys('SPACE');
        await VirtualKeyboard.get().tapOnSpace();
        await VirtualKeyboard.get().tapOnKeys('AND');
        await VirtualKeyboard.get().tapOnTab();

        await ReportUtility.addExpectedResult("AlphanumericUppercase input displays 'space and\ttab'", async() => {
            expect(await ShowcasePage.get().getManualAlphaNumericUppercaseLayoutField().getText()).toEqual('SPACE AND');
        });
    });

    it("Tap on page background to hide virtual keyboard", async () => {
        await ShowcasePage.get().tapOnBackground();

        await ReportUtility.addExpectedResult("Virtual keyboard is not displayed", async() => {
            expect(await VirtualKeyboard.get().isPresent()).toBeFalsy();
        });
    });
});
