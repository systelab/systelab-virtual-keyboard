import { Browser, ReportUtility, TestIdentification } from 'systelab-components-wdio-test';
import { ShowcasePage } from '../mapping/showcase-page';
import { VirtualKeyboard } from '../mapping/virtual-keyboard';
import { VersionUtility } from '../utils/version.util';


describe("AlphanumericLayout", () => {
    beforeAll(async () => {
        await Browser.navigateToURL("/");
    });

    beforeEach(async() => {
        TestIdentification.setTmsLink("TC-AlphanumericLayout");
        TestIdentification.setDescription("Checks if the alphanumeric layout of the virtual keyboard behaves as expected.");
        TestIdentification.setAppVersion(await VersionUtility.getLibraryVersion());
        TestIdentification.captureEnvironment();
    });

    it("Open virtual keyboard on alphanumeric input field", async () => {
        await ShowcasePage.get().getAlphanumericalField().openVirtualKeyboard();

        await ReportUtility.addExpectedResult("Virtual keyboard is shown with 5 rows of keys including all numbers, all lowercase letters, " + 
                                              "some symbols and some special keys", async() => {
            expect(await VirtualKeyboard.get().isPresent()).toBeTruthy();
            expect(await VirtualKeyboard.get().getRowCount()).toEqual(5);
            expect(await VirtualKeyboard.get().getRowKeys(0)).toEqual([      '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '{bksp}']);
            expect(await VirtualKeyboard.get().getRowKeys(1)).toEqual([  '{tab}', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\']);
            expect(await VirtualKeyboard.get().getRowKeys(2)).toEqual([ '{lock}', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', '{enter}']);
            expect(await VirtualKeyboard.get().getRowKeys(3)).toEqual(['{shift}', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '{shift}']);
            expect(await VirtualKeyboard.get().getRowKeys(4)).toEqual(['{space}']);
        });
    });

    it("Write 'abcdefghijklmnopqrstuvwxyz' by clicking on virtual keyboard keys", async () => {
        await VirtualKeyboard.get().clickKeys('abcdefghijklmnopqrstuvwxyz');

        await ReportUtility.addExpectedResult("Alphanumeric input displays 'abcdefghijklmnopqrstuvwxyz'", async() => {
            expect(await ShowcasePage.get().getAlphanumericalField().getText()).toEqual('abcdefghijklmnopqrstuvwxyz');
        });
    });

    it("Press 3 times the backspace key on the virtual keyboard", async () => {
        await VirtualKeyboard.get().clickBackspace();
        await VirtualKeyboard.get().clickBackspace();
        await VirtualKeyboard.get().clickBackspace();

        await ReportUtility.addExpectedResult("Alphanumeric input displays 'abcdefghijklmnopqrstuvw'", async() => {
            expect(await ShowcasePage.get().getAlphanumericalField().getText()).toEqual('abcdefghijklmnopqrstuvw');
        });
    });

    it("Append '1234567890' by clicking on virtual keyboard keys", async () => {
        await VirtualKeyboard.get().clickKeys('1234567890');

        await ReportUtility.addExpectedResult("Alphanumeric input displays 'abcdefghijklmnopqrstuvw1234567890'", async() => {
            expect(await ShowcasePage.get().getAlphanumericalField().getText()).toEqual('abcdefghijklmnopqrstuvw1234567890');
        });
    });

    it("Clear input content and write some symbols by clicking on virtual keyboard keys", async () => {
        await ShowcasePage.get().getAlphanumericalField().clear();
        await VirtualKeyboard.get().clickKeys("`-=;,./");

        await ReportUtility.addExpectedResult("Alphanumeric input displays '`-=;,./'", async() => {
            expect(await ShowcasePage.get().getAlphanumericalField().getText()).toEqual("`-=;,./");
        });
    });

    it("Click on 'Caps Lock' virtual keyboard key to change layout to uppercase", async () => {
        await VirtualKeyboard.get().clickCapsLock();

        await ReportUtility.addExpectedResult("Virtual keyboard now shows all letters in uppercase and more symbols", async() => {
            expect(await VirtualKeyboard.get().isPresent()).toBeTruthy();
            expect(await VirtualKeyboard.get().getRowCount()).toEqual(5);
            expect(await VirtualKeyboard.get().getRowKeys(0)).toEqual([      '~', '!', '@', '#', '$', '%', '^', '&amp;', '*', '(', ')', '_', '+', '{bksp}']);
            expect(await VirtualKeyboard.get().getRowKeys(1)).toEqual([  '{tab}', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|']);
            expect(await VirtualKeyboard.get().getRowKeys(2)).toEqual([ '{lock}', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', '{enter}']);
            expect(await VirtualKeyboard.get().getRowKeys(3)).toEqual(['{shift}', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '&lt;', '&gt;', '?', '{shift}']);
            expect(await VirtualKeyboard.get().getRowKeys(4)).toEqual(['{space}']);
        });
    });

    it("Clear input content and write 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' by clicking on virtual keyboard keys", async () => {
        await ShowcasePage.get().getAlphanumericalField().clear();
        await VirtualKeyboard.get().clickKeys('ABCDEFGHIJKLMNOPQRSTUVWXYZ');

        await ReportUtility.addExpectedResult("Alphanumeric input displays 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'", async() => {
            expect(await ShowcasePage.get().getAlphanumericalField().getText()).toEqual('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
        });
    });

    it("Clear again input content and write some other symbols by clicking on virtual keyboard keys", async () => {
        await ShowcasePage.get().getAlphanumericalField().clear();
        await VirtualKeyboard.get().clickKeys('!@#$%#^*()_+?|{}:"');

        await ReportUtility.addExpectedResult("Alphanumeric input displays '!@#$%#^*()_+?|{}:\"'", async() => {
            expect(await ShowcasePage.get().getAlphanumericalField().getText()).toEqual('!@#$%#^*()_+?|{}:"');
        });
    });

    it("Click again on 'Caps Lock' to return to lowercase layout", async () => {
        await VirtualKeyboard.get().clickCapsLock();

        await ReportUtility.addExpectedResult("Virtual keyboard is shown again with all lowercase letters and numbers", async() => {
            expect(await VirtualKeyboard.get().isPresent()).toBeTruthy();
            expect(await VirtualKeyboard.get().getRowCount()).toEqual(5);
            expect(await VirtualKeyboard.get().getRowKeys(0)).toEqual([      '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '{bksp}']);
            expect(await VirtualKeyboard.get().getRowKeys(1)).toEqual([  '{tab}', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\']);
            expect(await VirtualKeyboard.get().getRowKeys(2)).toEqual([ '{lock}', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', '{enter}']);
            expect(await VirtualKeyboard.get().getRowKeys(3)).toEqual(['{shift}', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '{shift}']);
            expect(await VirtualKeyboard.get().getRowKeys(4)).toEqual(['{space}']);
        });
    });

    it("Clear again input content and write some text with a space and a tab by clicking on virtual keyboard keys", async () => {
        await ShowcasePage.get().getAlphanumericalField().clear();
        await VirtualKeyboard.get().clickKeys('space');
        await VirtualKeyboard.get().clickSpace();
        await VirtualKeyboard.get().clickKeys('and');
        await VirtualKeyboard.get().clickTab();
        await VirtualKeyboard.get().clickKeys('tab');

        await ReportUtility.addExpectedResult("Alphanumeric input displays 'space and\ttab'", async() => {
            expect(await ShowcasePage.get().getAlphanumericalField().getText()).toEqual('space and\ttab');
        });
    });

    it("Click on page background to hide virtual keyboard", async () => {
        await ShowcasePage.get().clickOnBackground();

        await ReportUtility.addExpectedResult("Virtual keyboard is not displayed", async() => {
            expect(await VirtualKeyboard.get().isPresent()).toBeFalsy();
        });
    });
});
