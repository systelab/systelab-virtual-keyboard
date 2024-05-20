import { Browser, ReportUtility, TestIdentification } from 'systelab-components-wdio-test';
import { ShowcasePage } from '../mapping/showcase-page';
import { VirtualKeyboard } from '../mapping/virtual-keyboard';
import { VersionUtility } from '../utils/version.util';
import { CustomMatchers } from '../matchers/custom-matchers';


describe("PositionAndSize", () => {
    beforeAll(async () => {
        jasmine.addMatchers(CustomMatchers);
        await Browser.navigateToURL("/");
    });

    beforeEach(async() => {
        TestIdentification.setTmsLink("TC-PositionAndSize");
        TestIdentification.setDescription("Checks if the virtual keyboard is positioned and dimensioned as expected.");
        TestIdentification.setAppVersion(await VersionUtility.getLibraryVersion());
        TestIdentification.captureEnvironment();
    });

    it("Open virtual keyboard on alphanumeric input field", async () => {
        await ShowcasePage.get().getAlphanumericalField().setFocus();

        const keyboardRect = await VirtualKeyboard.get().getBoundingRect();
        const inputRect = await ShowcasePage.get().getAlphanumericalField().getBoundingRect();

        await ReportUtility.addExpectedResult("Virtual keyboard is shown", async() => {
            expect(await VirtualKeyboard.get().isPresent()).toBeTruthy();
        });

        await ReportUtility.addExpectedResult("Virtual keyboard size is about 1200x305 pixels", async() => {
            expect(keyboardRect.width).toBeSizedAs(1200);
            expect(keyboardRect.height).toBeSizedAs(305);
        });

        await ReportUtility.addExpectedResult("Virtual keyboard is located just under the alphanumerical input field", async() => {
            expect(keyboardRect.y).toBeLocatedAs(inputRect.y + inputRect.height);
        });

        await ReportUtility.addExpectedResult("Virtual keyboard is horizontally centered respect to input field", async() => {
            const inputCenterX = inputRect.x + (inputRect.width / 2);
            const keyboardCenterX = keyboardRect.x + (keyboardRect.width / 2);
            expect(keyboardCenterX).toBeLocatedAs(inputCenterX);
        });
    });

    it("Press 'Tab' key on physical keyboard to navigate to next numerical input field", async () => {
        await Browser.pressTab();

        const keyboardRect = await VirtualKeyboard.get().getBoundingRect();
        const inputRect = await ShowcasePage.get().getNumericField().getBoundingRect();

        await ReportUtility.addExpectedResult("Virtual keyboard continues being shown", async() => {
            expect(await VirtualKeyboard.get().isPresent()).toBeTruthy();
        });

        await ReportUtility.addExpectedResult("Virtual keyboard size is close to 400x265", async() => {
            expect(keyboardRect.width).toBeSizedAs(400);
            expect(keyboardRect.height).toBeSizedAs(265);
        });

        await ReportUtility.addExpectedResult("Virtual keyboard is located just under the numerical input field", async() => {
            expect(keyboardRect.y).toBeLocatedAs(inputRect.y + inputRect.height);
        });

        await ReportUtility.addExpectedResult("Virtual keyboard is horizontally centered respect to input field", async() => {
            const inputCenterX = inputRect.x + (inputRect.width / 2);
            const keyboardCenterX = keyboardRect.x + (keyboardRect.width / 2);
            expect(keyboardCenterX).toBeLocatedAs(inputCenterX);
        });
    });
});
