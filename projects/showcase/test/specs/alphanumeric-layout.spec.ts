import { Browser, ReportUtility, TestIdentification } from 'systelab-components-wdio-test';
import { ShowcasePage } from '../mapping/showcase-page';
import { VirtualKeyboard } from '../mapping/virtual-keyboard';
import { VersionUtility } from '../utils/version.util';
import { LayoutExpectation } from '../expectation/layout.expectation';


describe("AlphanumericLayout", () => {
    beforeAll(async () => {
        await Browser.navigateToURL("/");
    });

    beforeEach(async() => {
        TestIdentification.setTmsLink("TC-AlphanumericLayout");
        TestIdentification.setDescription("Checks if the alphanumeric layout of the virtual keyboard behaves as expected.");
        TestIdentification.setAppVersion(VersionUtility.getLibraryVersion());
        TestIdentification.captureEnvironment();
    });

    it("Tap on auto-configured alphanumeric layout input field", async () => {
        await ShowcasePage.get().getAutoAlphanumericLayoutField().tap();

        await LayoutExpectation.expectAlphanumericLayout();
    });

    it("Write 'abcdefghijklmnopqrstuvwxyz' by tapping on virtual keyboard keys", async () => {
        await VirtualKeyboard.get().tapOnKeys('abcdefghijklmnopqrstuvwxyz');

        await ReportUtility.addExpectedResult("Alphanumeric input displays 'abcdefghijklmnopqrstuvwxyz'", async() => {
            expect(await ShowcasePage.get().getAutoAlphanumericLayoutField().getText()).toEqual('abcdefghijklmnopqrstuvwxyz');
        });
    });

    it("Press 3 times the backspace key on the virtual keyboard", async () => {
        await VirtualKeyboard.get().tapOnBackspace();
        await VirtualKeyboard.get().tapOnBackspace();
        await VirtualKeyboard.get().tapOnBackspace();

        await ReportUtility.addExpectedResult("Alphanumeric input displays 'abcdefghijklmnopqrstuvw'", async() => {
            expect(await ShowcasePage.get().getAutoAlphanumericLayoutField().getText()).toEqual('abcdefghijklmnopqrstuvw');
        });
    });

    it("Append '1234567890' by tapping on virtual keyboard keys", async () => {
        await VirtualKeyboard.get().tapOnKeys('1234567890');

        await ReportUtility.addExpectedResult("Alphanumeric input displays 'abcdefghijklmnopqrstuvw1234567890'", async() => {
            expect(await ShowcasePage.get().getAutoAlphanumericLayoutField().getText()).toEqual('abcdefghijklmnopqrstuvw1234567890');
        });
    });

    it("Clear input content and write some symbols by tapping on virtual keyboard keys", async () => {
        await ShowcasePage.get().getAutoAlphanumericLayoutField().clear();
        await VirtualKeyboard.get().tapOnKeys('`-={}|:"<>?');

        await ReportUtility.addExpectedResult("Alphanumeric input displays '`-={}|:\"<>?'", async() => {
            expect(await ShowcasePage.get().getAutoAlphanumericLayoutField().getText()).toEqual('`-={}|:"<>?');
        });
    });

    it("Tap on 'Caps Lock' virtual keyboard key to change layout to uppercase", async () => {
        await VirtualKeyboard.get().tapOnCapsLock();

        await LayoutExpectation.expectAlphanumericShiftLayout();
    });

    it("Clear input content and write 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' by tapping on virtual keyboard keys", async () => {
        await ShowcasePage.get().getAutoAlphanumericLayoutField().clear();
        await VirtualKeyboard.get().tapOnKeys('ABCDEFGHIJKLMNOPQRSTUVWXYZ');

        await ReportUtility.addExpectedResult("Alphanumeric input displays 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'", async() => {
            expect(await ShowcasePage.get().getAutoAlphanumericLayoutField().getText()).toEqual('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
        });
    });

    it("Clear again input content and write some other symbols by tapping on virtual keyboard keys", async () => {
        await ShowcasePage.get().getAutoAlphanumericLayoutField().clear();
        await VirtualKeyboard.get().tapOnKeys('!@#$%^*()_+[];');

        await ReportUtility.addExpectedResult("Alphanumeric input displays '!@#$%^*()_+[];'", async() => {
            expect(await ShowcasePage.get().getAutoAlphanumericLayoutField().getText()).toEqual('!@#$%^*()_+[];');
        });
    });

    it("Tap again on 'Caps Lock' to return to lowercase layout", async () => {
        await VirtualKeyboard.get().tapOnCapsLock();

        await LayoutExpectation.expectAlphanumericLayout();
    });

    it("Tap on 'Shift' virtual keyboard key to change layout to uppercase for only once key", async () => {
        await VirtualKeyboard.get().tapOnShift();

        await LayoutExpectation.expectAlphanumericShiftLayout();
    });

    it("Tap on 'S' virtual keyboard key and the lowercase layout is back", async() => {
        await VirtualKeyboard.get().tapOnKey('S');

        await LayoutExpectation.expectAlphanumericLayout();
    })

    it("Clear again input content and write some text with a space and a tab by tapping on virtual keyboard keys", async () => {
        await ShowcasePage.get().getAutoAlphanumericLayoutField().clear();
        await VirtualKeyboard.get().tapOnKeys('space');
        await VirtualKeyboard.get().tapOnSpace();
        await VirtualKeyboard.get().tapOnKeys('and');
        await VirtualKeyboard.get().tapOnTab();

        await ReportUtility.addExpectedResult("Alphanumeric input displays 'space and\ttab'", async() => {
            expect(await ShowcasePage.get().getAutoAlphanumericLayoutField().getText()).toEqual('space and');
        });
    });

    it("Tap on page background to hide virtual keyboard", async () => {
        await ShowcasePage.get().tapOnBackground();

        await ReportUtility.addExpectedResult("Virtual keyboard is not displayed", async() => {
            expect(await VirtualKeyboard.get().isPresent()).toBeFalsy();
        });
    });
});
