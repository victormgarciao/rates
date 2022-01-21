import { isRightFormatAmount } from '../isRightFormatAmount'

describe('isRightFormatAmount', () => {
    test('return true if starts on +-,. or a number', () => {
        expect(isRightFormatAmount('+12')).toBe(true)
        expect(isRightFormatAmount('-12')).toBe(true)
        expect(isRightFormatAmount('12')).toBe(true)
    });

    test('return false if does not starts on +- nor a number', () => {
        expect(isRightFormatAmount('tupi')).toBe(false)
        expect(isRightFormatAmount('$tupi')).toBe(false)
        expect(isRightFormatAmount('&tupi')).toBe(false)
    });
});