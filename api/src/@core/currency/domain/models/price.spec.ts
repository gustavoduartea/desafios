import Price from "./price";
import InvalidPrice from "../exceptions/invalid-price";

describe('Price', () => {
    test('should create an instance of Price with a valid value', () => {
        const validPrice = new Price(100);
        expect(validPrice).toBeInstanceOf(Price);
        expect(validPrice.value).toBe(100);
    });

    test('should throw InvalidPrice exception for non-positive values', () => {
        expect(() => new Price(0)).toThrow(InvalidPrice);
        expect(() => new Price(-1)).toThrow(InvalidPrice);
    });
});
