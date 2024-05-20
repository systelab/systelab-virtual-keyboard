import { Browser, ReportUtility, TestIdentification } from 'systelab-components-wdio-test';
import { ShowcasePage } from '../mapping/showcase-page';
import { VirtualKeyboard } from '../mapping/virtual-keyboard';
import { VersionUtility } from '../utils/version.util';


describe("NumericLayout", () => {
    beforeAll(async () => {
        await Browser.navigateToURL("/");
    });

    beforeEach(async() => {
        TestIdentification.setTmsLink("TC-NumericLayout");
        TestIdentification.setDescription("Checks if the numeric layout of the virtual keyboard behaves as expected.");
        TestIdentification.setAppVersion(await VersionUtility.getLibraryVersion());
        TestIdentification.captureEnvironment();
    });

    it("Open virtual keyboard on numerical input field", async () => {
        await ShowcasePage.get().getNumericField().openVirtualKeyboard();

        await ReportUtility.addExpectedResult("Virtual keyboard is shown with 4 rows of keys including all numbers and backspace", async() => {
            expect(await VirtualKeyboard.get().isPresent()).toBeTruthy();
            expect(await VirtualKeyboard.get().getRowCount()).toEqual(4);
            expect(await VirtualKeyboard.get().getRowKeys(0)).toEqual(['7', '8', '9']);
            expect(await VirtualKeyboard.get().getRowKeys(1)).toEqual(['4', '5', '6']);
            expect(await VirtualKeyboard.get().getRowKeys(2)).toEqual(['1', '2', '3']);
            expect(await VirtualKeyboard.get().getRowKeys(3)).toEqual(['0', '{bksp}']);
        });
    });

    it("Write '9876543210' by clicking on virtual keyboard keys", async () => {
        await VirtualKeyboard.get().clickKeys('9876543210');

        await ReportUtility.addExpectedResult("Numeric input displays '9876543210'", async() => {
            expect(await ShowcasePage.get().getNumericField().getText()).toEqual('9876543210');
        });
    });

    it("Press 3 times the backspace key on the virtual keyboard", async () => {
        await VirtualKeyboard.get().clickBackspace();
        await VirtualKeyboard.get().clickBackspace();
        await VirtualKeyboard.get().clickBackspace();

        await ReportUtility.addExpectedResult("Numeric input displays '9876543'", async() => {
            expect(await ShowcasePage.get().getNumericField().getText()).toEqual('9876543');
        });
    });

    it("Append '666' by clicking on virtual keyboard keys", async () => {
        await VirtualKeyboard.get().clickKeys('666');

        await ReportUtility.addExpectedResult("Numeric input displays '9876543666'", async() => {
            expect(await ShowcasePage.get().getNumericField().getText()).toEqual('9876543666');
        });
    });

    it("Click on page background to hide virtual keyboard", async () => {
        await ShowcasePage.get().clickOnBackground();

        await ReportUtility.addExpectedResult("Virtual keyboard is not displayed", async() => {
            expect(await VirtualKeyboard.get().isPresent()).toBeFalsy();
        });
    });
});