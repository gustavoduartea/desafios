import Currency, { CurrencyId } from "./currency";
import Price from "./price";

describe('Currency', () => {
    const initialId = new CurrencyId();
    const initialPrice = new Price(100);
    const initialPercentage = 5.0;

    let currency: Currency;

    beforeEach(() => {
        currency = new Currency(
            initialId,
            'Bitcoin',
            'BTC',
            initialPrice,
            initialPercentage
        );
    });

    test('should create an instance of Currency with initial values', () => {
        expect(currency).toBeInstanceOf(Currency);
        expect(currency.toJSON()).toEqual({
            id: initialId.value,
            name: 'Bitcoin',
            symbol: 'BTC',
            currentPrice: initialPrice.value,
            priceChangePercentage24h: initialPercentage
        });
    });

    test('should adjust price correctly', () => {
        const newPrice = 120;
        currency.adjustPrice(newPrice);
        expect(currency.toJSON().currentPrice).toBe(newPrice);
    });

    test('should adjust price change percentage correctly', () => {
        const newValue = 10.0;
        currency.adjustPriceChangePercentage24h(newValue);
        expect(currency.toJSON().priceChangePercentage24h).toBe(900);
    });
});
