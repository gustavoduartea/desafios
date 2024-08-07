import CryptoCompare from "./crypto-compare";
import AxiosClientHttpAdapter from '../http/client/axios';

describe('CryptoCompare Integration Test', () => {
    let cryptoCompare: CryptoCompare;

    beforeEach(() => {
        cryptoCompare = new CryptoCompare(new AxiosClientHttpAdapter());
    });

    test('should return formatted data from CryptoCompare API', async () => {
        const coin = 'BTC';
        const result = await cryptoCompare.getByCoin(coin);

        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);
        
        result.forEach(item => {
            expect(item).toHaveProperty('high');
            expect(item).toHaveProperty('low');
            expect(item).toHaveProperty('open');
            expect(item).toHaveProperty('time');
        });
    });

    test('should return error when coin dont exists', async () => {
        const coin = 'B';
        expect(cryptoCompare.getByCoin(coin)).rejects.toThrow();
    });
});
