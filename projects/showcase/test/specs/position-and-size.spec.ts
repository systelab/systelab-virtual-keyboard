import { Browser, ReportUtility, TestIdentification } from 'systelab-components-wdio-test';
import { ShowcasePage } from '../mapping/showcase-page';
import { VirtualKeyboard } from '../mapping/virtual-keyboard';
import { VersionUtility } from '../utils/version.util';


describe("PositionAndSize", () => {
    const TOLERANCE = 10;

    beforeAll(async () => {
        await Browser.navigateToURL("/");
    });

    beforeEach(async() => {
        TestIdentification.setTmsLink("TC-PositionAndSize");
        TestIdentification.setDescription("Checks if the virtual keyboard is positioned and dimensioned as expected.");
        TestIdentification.setAppVersion(await VersionUtility.getLibraryVersion());
        TestIdentification.captureEnvironment();
    });

    it("Open virtual keyboard on alphanumeric input field", async () => {
        await ShowcasePage.get().getAlphanumericalField().openVirtualKeyboard();

        const keyboardRect = await VirtualKeyboard.get().getBoundingRect();
        const inputRect = await ShowcasePage.get().getAlphanumericalField().getBoundingRect();

        await ReportUtility.addExpectedResult("Virtual keyboard is shown", async() => {
            expect(await VirtualKeyboard.get().isPresent()).toBeTruthy();
        });

        await ReportUtility.addExpectedResult("Virtual keyboard size is close to 1200x305", async() => {
            expect(keyboardRect.width).toBeCloseTo(1200, TOLERANCE);
            expect(keyboardRect.height).toBeCloseTo(305, TOLERANCE);
        });

        await ReportUtility.addExpectedResult("Virtual keyboard is located just under the input field", async() => {
            expect(keyboardRect.y).toBeCloseTo(inputRect.y + inputRect.height, TOLERANCE);
        });
    });

});
