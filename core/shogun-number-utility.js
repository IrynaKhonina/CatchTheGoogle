/**
 * Utility class for generating random integer numbers within specified ranges.
 * Provides methods for generating random numbers with proper validation and error handling.
 */
export class ShogunNumberUtility {
    /**
     * Generates a random integer between the specified range (inclusive).
     * @param {number} fromInclusive - The lower bound of the range (inclusive)
     * @param {number} toInclusive - The upper bound of the range (inclusive)
     * @returns {number} A random integer between fromInclusive and toInclusive
     * @throws {TypeError} If either argument is not a number
     * @throws {RangeError} If fromInclusive is greater than or equal to toInclusive
     * @example
     * // returns a number between 1 and 10 (inclusive)
     * new ShogunNumberUtility().getRandomIntegerNumber(1, 10);
     */
    getRandomIntegerNumber(fromInclusive, toInclusive) {
        if (typeof fromInclusive !== 'number' || typeof toInclusive !== 'number') {
            throw new TypeError('Arguments must be numbers');
        }
        if (fromInclusive >= toInclusive) {
            throw new RangeError('fromInclusive must be less than toInclusive');
        }

        // Formula for random integer in range [fromInclusive, toInclusive]
        return Math.floor(Math.random() * (toInclusive - fromInclusive + 1)) + fromInclusive;
    }
}