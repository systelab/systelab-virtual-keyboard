import { ReportUtility } from 'systelab-components-wdio-test';
import { VirtualKeyboard } from '../mapping/virtual-keyboard';

export class LayoutExpectation {
    public static async expectAlphanumericLayout() {
        await ReportUtility.addExpectedResult("Virtual keyboard is shown again with all lowercase letters and numbers", async() => {
            expect(await VirtualKeyboard.get().isPresent()).toBeTruthy();
            expect(await VirtualKeyboard.get().getRowCount()).toEqual(5);
            expect(await VirtualKeyboard.get().getRowKeys(0)).toEqual([      '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '{bksp}']);
            expect(await VirtualKeyboard.get().getRowKeys(1)).toEqual([  '{tab}', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '{', '}', '|']);
            expect(await VirtualKeyboard.get().getRowKeys(2)).toEqual([ '{lock}', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ':', '"', '{enter}']);
            expect(await VirtualKeyboard.get().getRowKeys(3)).toEqual(['{shift}', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '<', '>', '?', '{shift}']);
            expect(await VirtualKeyboard.get().getRowKeys(4)).toEqual(['{space}']);
        });
    }

    public static async expectAlphanumericShiftLayout() {
        await ReportUtility.addExpectedResult("Virtual keyboard now shows all letters in uppercase and more symbols", async () => {
            expect(await VirtualKeyboard.get().isPresent()).toBeTruthy();
            expect(await VirtualKeyboard.get().getRowCount()).toEqual(5);
            expect(await VirtualKeyboard.get().getRowKeys(0)).toEqual([      '~', '!', '@', '#', '$', '%', '^', '&amp;', '*', '(', ')', '_', '+', '{bksp}']);
            expect(await VirtualKeyboard.get().getRowKeys(1)).toEqual([  '{tab}', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\']);
            expect(await VirtualKeyboard.get().getRowKeys(2)).toEqual([ '{lock}', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", '{enter}']);
            expect(await VirtualKeyboard.get().getRowKeys(3)).toEqual(['{shift}', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', '{shift}']);
            expect(await VirtualKeyboard.get().getRowKeys(4)).toEqual(['{space}']);
        });
    }


    public static async expectAlphanumericUppercaseLayout() {
        await ReportUtility.addExpectedResult("Virtual keyboard now shows all letters in uppercase and numbers", async () => {
            expect(await VirtualKeyboard.get().isPresent()).toBeTruthy();
            expect(await VirtualKeyboard.get().getRowCount()).toEqual(5);
            expect(await VirtualKeyboard.get().getRowKeys(0)).toEqual([      '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '{bksp}']);
            expect(await VirtualKeyboard.get().getRowKeys(1)).toEqual([  '{tab}', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\']);
            expect(await VirtualKeyboard.get().getRowKeys(2)).toEqual([ '{lock}', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',  ';', "'", '{enter}']);
            expect(await VirtualKeyboard.get().getRowKeys(3)).toEqual(['{shift}', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', '{shift}']);
            expect(await VirtualKeyboard.get().getRowKeys(4)).toEqual(['{space}']);
        });
    }

    public static async expectAlphanumericUppercaseShiftLayout() {
        await ReportUtility.addExpectedResult("Virtual keyboard now shows all letters in uppercase and more symbols", async () => {
            expect(await VirtualKeyboard.get().isPresent()).toBeTruthy();
            expect(await VirtualKeyboard.get().getRowCount()).toEqual(5);
            expect(await VirtualKeyboard.get().getRowKeys(0)).toEqual([      '~', '!', '@', '#', '$', '%', '^', '&amp;', '*', '(', ')', '_', '+', '{bksp}']);
            expect(await VirtualKeyboard.get().getRowKeys(1)).toEqual([  '{tab}', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\']);
            expect(await VirtualKeyboard.get().getRowKeys(2)).toEqual([ '{lock}', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", '{enter}']);
            expect(await VirtualKeyboard.get().getRowKeys(3)).toEqual(['{shift}', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', '{shift}']);
            expect(await VirtualKeyboard.get().getRowKeys(4)).toEqual(['{space}']);
        });
    }
}
