import { replaceDotForCommaOf } from '../replaceDotForCommaOf'

describe('isRightFormatAmount', () => {
    test('return the same value with comma instead of dot', () => {
        expect(replaceDotForCommaOf('tupi.test')).toBe('tupi,test')
    });

    test('return the same value if value has a ,', () => {
        expect(replaceDotForCommaOf('tupi,test')).toBe('tupi,test')
    });

    test('return the same value if value has not a , nor a .', () => {
        expect(replaceDotForCommaOf('tupiTest')).toBe('tupiTest')
    });
});