import UserCurrency from './user-currency';
import { CurrencyId } from "../../currency/domain/models/currency";
import { UserId } from "./user";

describe('UserCurrency', () => {
    let userId: UserId;
    let btcId: CurrencyId;
    let ethId: CurrencyId;

    beforeEach(() => {
        userId = new UserId();
        btcId = new CurrencyId('bitcoin');
        ethId = new CurrencyId('ethereum');
    });

    it('should create a UserCurrency instance with initial currencies', () => {
        const userCurrency = UserCurrency.create(userId.value, [btcId, ethId]);

        expect(userCurrency.getCurrencies()).toEqual([btcId, ethId]);
    });

    it('should add a new currency', () => {
        const userCurrency = UserCurrency.create(userId.value, [btcId]);

        const ltcId = new CurrencyId('litecoin');
        userCurrency.addNewCurrency(ltcId);

        expect(userCurrency.getCurrencies()).toContain(ltcId);
    });

    it('should throw an error when adding a duplicate currency', () => {
        const userCurrency = UserCurrency.create(userId.value, [btcId]);

        expect(() => userCurrency.addNewCurrency(btcId)).toThrow('Already have this coin');
    });

    it('should remove an existing currency', () => {
        const userCurrency = UserCurrency.create(userId.value, [btcId, ethId]);

        userCurrency.removeCurrency(btcId);

        expect(userCurrency.getCurrencies()).not.toContain(btcId);
    });

    it('should throw an error when removing a non-existing currency', () => {
        const userCurrency = UserCurrency.create(userId.value, [btcId]);

        expect(() => userCurrency.removeCurrency(ethId)).toThrow('Dont hava this coint');
    });

    it('should convert to JSON correctly', () => {
        const userCurrency = UserCurrency.create(userId.value, [btcId, ethId]);

        expect(userCurrency.toJSON()).toEqual({
            id: userId.value,
            currencies: ['bitcoin', 'ethereum'],
        });
    });
});
