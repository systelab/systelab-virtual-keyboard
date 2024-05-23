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

    it("Set focus on auto-configured alphanumeric layout input field", async () => {
        await ShowcasePage.get().getAutoAlphanumericLayoutField().setFocus();

        await LayoutExpectation.expectAlphanumericLowercaseLayout();
    });

    it("Write 'abcdefghijklmnopqrstuvwxyz' by clicking on virtual keyboard keys", async () => {
        await VirtualKeyboard.get().clickKeys('abcdefghijklmnopqrstuvwxyz');

        await ReportUtility.addExpectedResult("Alphanumeric input displays 'abcdefghijklmnopqrstuvwxyz'", async() => {
            expect(await ShowcasePage.get().getAutoAlphanumericLayoutField().getText()).toEqual('abcdefghijklmnopqrstuvwxyz');
        });
    });

    it("Press 3 times the backspace key on the virtual keyboard", async () => {
        await VirtualKeyboard.get().clickBackspace();
        await VirtualKeyboard.get().clickBackspace();
        await VirtualKeyboard.get().clickBackspace();

        await ReportUtility.addExpectedResult("Alphanumeric input displays 'abcdefghijklmnopqrstuvw'", async() => {
            expect(await ShowcasePage.get().getAutoAlphanumericLayoutField().getText()).toEqual('abcdefghijklmnopqrstuvw');
        });
    });

    it("Append '1234567890' by clicking on virtual keyboard keys", async () => {
        await VirtualKeyboard.get().clickKeys('1234567890');

        await ReportUtility.addExpectedResult("Alphanumeric input displays 'abcdefghijklmnopqrstuvw1234567890'", async() => {
            expect(await ShowcasePage.get().getAutoAlphanumericLayoutField().getText()).toEqual('abcdefghijklmnopqrstuvw1234567890');
        });
    });

    it("Clear input content and write some symbols by clicking on virtual keyboard keys", async () => {
        await ShowcasePage.get().getAutoAlphanumericLayoutField().clear();
        await VirtualKeyboard.get().clickKeys("`-=;,./");

        await ReportUtility.addExpectedResult("Alphanumeric input displays '`-=;,./'", async() => {
            expect(await ShowcasePage.get().getAutoAlphanumericLayoutField().getText()).toEqual("`-=;,./");
        });
    });

    it("Click on 'Caps Lock' virtual keyboard key to change layout to uppercase", async () => {
        await VirtualKeyboard.get().clickCapsLock();

        await LayoutExpectation.expectAlphanumericUppercaseLayout();
    });

    it("Clear input content and write 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' by clicking on virtual keyboard keys", async () => {
        await ShowcasePage.get().getAutoAlphanumericLayoutField().clear();
        await VirtualKeyboard.get().clickKeys('ABCDEFGHIJKLMNOPQRSTUVWXYZ');

        await ReportUtility.addExpectedResult("Alphanumeric input displays 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'", async() => {
            expect(await ShowcasePage.get().getAutoAlphanumericLayoutField().getText()).toEqual('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
        });
    });

    it("Clear again input content and write some other symbols by clicking on virtual keyboard keys", async () => {
        await ShowcasePage.get().getAutoAlphanumericLayoutField().clear();
        await VirtualKeyboard.get().clickKeys('!@#$%#^*()_+?|{}:"');

        await ReportUtility.addExpectedResult("Alphanumeric input displays '!@#$%#^*()_+?|{}:\"'", async() => {
            expect(await ShowcasePage.get().getAutoAlphanumericLayoutField().getText()).toEqual('!@#$%#^*()_+?|{}:"');
        });
    });

    it("Click again on 'Caps Lock' to return to lowercase layout", async () => {
        await VirtualKeyboard.get().clickCapsLock();

        await LayoutExpectation.expectAlphanumericLowercaseLayout();
    });

    it("Click on 'Shift' virtual keyboard key to change layout to uppercase for only once key", async () => {
        await VirtualKeyboard.get().clickShift();

        await LayoutExpectation.expectAlphanumericUppercaseLayout();
    });

    it("Click on 'S' virtual keyboard key and the lowercase layout is back", async() => {
        await VirtualKeyboard.get().clickKey('S');

        await LayoutExpectation.expectAlphanumericLowercaseLayout();
    })

    it("Clear again input content and write some text with a space and a tab by clicking on virtual keyboard keys", async () => {
        await ShowcasePage.get().getAutoAlphanumericLayoutField().clear();
        await VirtualKeyboard.get().clickKeys('space');
        await VirtualKeyboard.get().clickSpace();
        await VirtualKeyboard.get().clickKeys('and');
        await VirtualKeyboard.get().clickTab();

        await ReportUtility.addExpectedResult("Alphanumeric input displays 'space and\ttab'", async() => {
            expect(await ShowcasePage.get().getAutoAlphanumericLayoutField().getText()).toEqual('space and');
        });
    });

    it("Click on page background to hide virtual keyboard", async () => {
        await ShowcasePage.get().clickOnBackground();

        await ReportUtility.addExpectedResult("Virtual keyboard is not displayed", async() => {
            expect(await VirtualKeyboard.get().isPresent()).toBeFalsy();
        });
    });
});
