import { isLastDigitNotNumber } from '../isLastDigitNotNumber';


describe('isLastDigitNotNumber' , () => {
	test('return true when the digit is +', () => {
        expect(isLastDigitNotNumber('+')).toBe(true);
	});
	
	test('return true when the digit is -', () => {
        expect(isLastDigitNotNumber('-')).toBe(true);
	});

	test('return true when the digit is .', () => {
        expect(isLastDigitNotNumber('.')).toBe(true);
	});

	test('return true when the digit is ,', () => {
        expect(isLastDigitNotNumber(',')).toBe(true);
	});

	test('return false when the digit is not ,.+-', () => {
        expect(isLastDigitNotNumber('0')).toBe(false);
        expect(isLastDigitNotNumber('#')).toBe(false);
        expect(isLastDigitNotNumber('u')).toBe(false);
	});

	test('return false when there is more than one char', () => {
        expect(isLastDigitNotNumber('0,')).toBe(false);
        expect(isLastDigitNotNumber('e+')).toBe(false);
        expect(isLastDigitNotNumber('44')).toBe(false);
	});
});
