import {ShogunNumberUtility} from './shogun-number-utility';

describe('ShogunNumberUtility', () => {
    const utility = new ShogunNumberUtility();

    it('should generate a number within the given range', () => {
        const fromInclusive = 10;
        const toExclusive = 20;
        const result = utility.getRandomIntegerNumber(fromInclusive, toExclusive);
        expect(result).toBeGreaterThanOrEqual(fromInclusive);
        expect(result).toBeLessThan(toExclusive);
    });

    it('should throw a TypeError if arguments are not numbers', () => {
        expect(() => utility.getRandomIntegerNumber('10', 20)).toThrow(TypeError);
        expect(() => utility.getRandomIntegerNumber(10, '20')).toThrow(TypeError);
    });

    it('should throw a RangeError if fromInclusive is not less than toExclusive', () => {
        expect(() => utility.getRandomIntegerNumber(20, 10)).toThrow(RangeError);
        expect(() => utility.getRandomIntegerNumber(10, 10)).toThrow(RangeError);
    });

    it('should handle edge cases properly', () => {
        // Single value range (e.g., 0 to 1)
        expect(utility.getRandomIntegerNumber(0, 1)).toBe(0);
    });
});