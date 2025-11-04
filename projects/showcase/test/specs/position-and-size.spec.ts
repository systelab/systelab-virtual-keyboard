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
        TestIdentification.setAppVersion(VersionUtility.getLibraryVersion());
        TestIdentification.captureEnvironment();
    });

    it("Inspect elements displayed just after opening showcase page", async () => {
        await ReportUtility.addExpectedResult("Virtual keyboard is not shown", async() => {
            expect(await VirtualKeyboard.get().isPresent()).toBeFalsy();
        });

        await ReportUtility.addExpectedResult("Icon to open virtual keyboard is shown only for one of the inputs", async() => {
            expect(await ShowcasePage.get().getShowVirtualKeyboardIconField().isVirtualKeyboardIconPresent()).toBeTruthy();

            expect(await ShowcasePage.get().getAutoAlphanumericLayoutField().isVirtualKeyboardIconPresent()).toBeFalsy();
            expect(await ShowcasePage.get().getAutoNumericLayoutField().isVirtualKeyboardIconPresent()).toBeFalsy();
            expect(await ShowcasePage.get().getManualNumericLayoutField().isVirtualKeyboardIconPresent()).toBeFalsy();
            expect(await ShowcasePage.get().getFixedBottomPositioningField().isVirtualKeyboardIconPresent()).toBeFalsy();
        });
    });

    it("Tap on input field with auto-configured alphanumeric layout", async () => {
        await ShowcasePage.get().getAutoAlphanumericLayoutField().tap();

        const keyboardRect = await VirtualKeyboard.get().getBoundingRect();
        const inputRect = await ShowcasePage.get().getAutoAlphanumericLayoutField().getBoundingRect();

        await ReportUtility.addExpectedResult("Virtual keyboard is shown", async() => {
            expect(await VirtualKeyboard.get().isPresent()).toBeTruthy();
        });

        await ReportUtility.addExpectedResult("Virtual keyboard size is about 1200x340 pixels", async() => {
            expect(keyboardRect.width).toBeSizedAs(1200);
            expect(keyboardRect.height).toBeSizedAs(340);
        });

        await ReportUtility.addExpectedResult("Virtual keyboard is located just under the auto-configured alphanumeric input field", async() => {
            expect(keyboardRect.y).toBeLocatedAs(inputRect.y + inputRect.height);
        });

        await ReportUtility.addExpectedResult("Virtual keyboard is horizontally centered respect to input field", async() => {
            const inputCenterX = inputRect.x + (inputRect.width / 2);
            const keyboardCenterX = keyboardRect.x + (keyboardRect.width / 2);
            expect(keyboardCenterX).toBeLocatedAs(inputCenterX);
        });
    });

    it("Tap on background and tap on auto-configured numeric layout input field", async () => {
        await ShowcasePage.get().tapOnBackground();
        await ShowcasePage.get().getAutoNumericLayoutField().tap();

        const keyboardRect = await VirtualKeyboard.get().getBoundingRect();
        const inputRect = await ShowcasePage.get().getAutoNumericLayoutField().getBoundingRect();

        await ReportUtility.addExpectedResult("Virtual keyboard continues being shown", async() => {
            expect(await VirtualKeyboard.get().isPresent()).toBeTruthy();
        });

        await ReportUtility.addExpectedResult("Virtual keyboard size is close to 331x285", async() => {
            expect(keyboardRect.width).toBeSizedAs(331);
            expect(keyboardRect.height).toBeSizedAs(285);
        });

        await ReportUtility.addExpectedResult("Virtual keyboard is located just under the auto-configured numerical input field", async() => {
            expect(keyboardRect.y).toBeLocatedAs(inputRect.y + inputRect.height);
        });

        await ReportUtility.addExpectedResult("Virtual keyboard is horizontally centered respect to input field", async() => {
            const inputCenterX = inputRect.x + (inputRect.width / 2);
            const keyboardCenterX = keyboardRect.x + (keyboardRect.width / 2);
            expect(keyboardCenterX).toBeLocatedAs(inputCenterX);
        });
    });

    it("Tap on background and tap on input text with manually configured numeric layout", async () => {
        await ShowcasePage.get().tapOnBackground();
        await ShowcasePage.get().getManualNumericLayoutField().tap();

        const keyboardRect = await VirtualKeyboard.get().getBoundingRect();
        const inputRect = await ShowcasePage.get().getManualNumericLayoutField().getBoundingRect();

        await ReportUtility.addExpectedResult("Virtual keyboard continues being shown", async() => {
            expect(await VirtualKeyboard.get().isPresent()).toBeTruthy();
        });

        await ReportUtility.addExpectedResult("Virtual keyboard is located just under the manually configured numeric input field", async() => {
            expect(keyboardRect.y).toBeLocatedAs(inputRect.y + inputRect.height);
        });

        await ReportUtility.addExpectedResult("Virtual keyboard is horizontally centered respect to input field", async() => {
            const inputCenterX = inputRect.x + (inputRect.width / 2);
            const keyboardCenterX = keyboardRect.x + (keyboardRect.width / 2);
            expect(keyboardCenterX).toBeLocatedAs(inputCenterX);
        });
    });

    it("Tap on background and then click on virtual keyboard icon of the only input field that has it", async () => {
        await ShowcasePage.get().tapOnBackground();
        await ShowcasePage.get().getShowVirtualKeyboardIconField().clickVirtualKeyboardIcon();

        await ReportUtility.addExpectedResult("Virtual keyboard continues being shown", async() => {
            expect(await VirtualKeyboard.get().isPresent()).toBeTruthy();
        });

        const inputRect = await ShowcasePage.get().getShowVirtualKeyboardIconField().getBoundingRect();
        const keyboardRect = await VirtualKeyboard.get().getBoundingRect();
        await ReportUtility.addExpectedResult("Virtual keyboard is located just under the input field with the icon", async() => {
            expect(keyboardRect.y).toBeLocatedAs(inputRect.y + inputRect.height);
        });

        await ReportUtility.addExpectedResult("Virtual keyboard is horizontally centered respect to input field with the icon", async() => {
            const inputCenterX = inputRect.x + (inputRect.width / 2);
            const keyboardCenterX = keyboardRect.x + (keyboardRect.width / 2);
            expect(keyboardCenterX).toBeLocatedAs(inputCenterX);
        });
    });

    it("Tap on background and do a mouse click on same input field", async () => {
        await ShowcasePage.get().tapOnBackground();
        await ShowcasePage.get().getShowVirtualKeyboardIconField().click();

        await ReportUtility.addExpectedResult("Virtual keyboard is not shown anymore", async() => {
            expect(await VirtualKeyboard.get().isPresent()).toBeFalsy();
        });
    });

    it("Do a mouse click on the only input field that accepts mouse clicks to show virtual keyboard", async () => {
        await ShowcasePage.get().tapOnBackground();
        await ShowcasePage.get().getShowOnMouseClickField().click();

        await ReportUtility.addExpectedResult("Virtual keyboard is shown again", async() => {
            expect(await VirtualKeyboard.get().isPresent()).toBeTruthy();
        });

        const inputRect = await ShowcasePage.get().getShowOnMouseClickField().getBoundingRect();
        const keyboardRect = await VirtualKeyboard.get().getBoundingRect();
        await ReportUtility.addExpectedResult("Virtual keyboard is located just under the input field that accepts clicks", async() => {
            const expectedY = inputRect.y + inputRect.height;
            expect(keyboardRect.y).toBeGreaterThan(expectedY - 5);
            expect(keyboardRect.y).toBeLessThan(expectedY + 5);
        });
    });

    it("Change focus to input field configured virtual keyboard in fixed bottom position", async () => {
        await ShowcasePage.get().tapOnBackground();
        await ShowcasePage.get().getFixedBottomPositioningField().tap();

        await ReportUtility.addExpectedResult("Virtual keyboard continues being shown", async() => {
            expect(await VirtualKeyboard.get().isPresent()).toBeTruthy();
        });

        const keyboardRect = await VirtualKeyboard.get().getBoundingRect();
        await ReportUtility.addExpectedResult("Virtual keyboard size is about 1200x340 pixels", async() => {
            expect(keyboardRect.width).toBeSizedAs(1200);
            expect(keyboardRect.height).toBeSizedAs(340);
        });

        /*const windowSize = await Browser.getWindowSize();
        await ReportUtility.addExpectedResult("Virtual keyboard is located aligned with the bottom on the window", async() => {
            expect(keyboardRect.y).toBeLocatedAs(windowSize.height - keyboardRect.height);
        });

        await ReportUtility.addExpectedResult("Virtual keyboard is horizontally centered on the window", async() => {
            const windowCenterX = (windowSize.width / 2);
            const keyboardCenterX = keyboardRect.x + (keyboardRect.width / 2);
            expect(keyboardCenterX).toBeLocatedAs(windowCenterX);
        });*/
    });

});
