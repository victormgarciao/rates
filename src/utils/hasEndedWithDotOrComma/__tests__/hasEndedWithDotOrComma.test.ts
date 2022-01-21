import { hasEndedWithDotOrComma } from '../hasEndedWithDotOrComma';

describe('hasEndedWithDotOrComma' , () => {
	test('renders true when the value ends with .', () => {
        expect(hasEndedWithDotOrComma('tupi.')).toBe(true);
	});

	test('renders true when the value ends with ,', () => {
        expect(hasEndedWithDotOrComma('tupi,')).toBe(true);
	});

	test('renders false when the value is not , nor .', () => {
        expect(hasEndedWithDotOrComma('tupi')).toBe(false);
        expect(hasEndedWithDotOrComma('tup+')).toBe(false);
        expect(hasEndedWithDotOrComma('tup$')).toBe(false);
	});
});
