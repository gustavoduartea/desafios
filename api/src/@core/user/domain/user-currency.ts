// user-currency.ts
import AggregateRoot from "../../commom/domain/aggregate";
import { CurrencyId } from "../../currency/domain/models/currency";
import { UserId } from "./user";

export default class UserCurrency extends AggregateRoot {
    private readonly currencies: CurrencyId[];

    private constructor(
        id: UserId,
        currencies: CurrencyId[] = []
    ) {
        super(id);
        this.currencies = currencies;
    }

    public static create(
        id: string,
        initialCurrencies: CurrencyId[] = []
    ): UserCurrency {
        const uniqueCurrencies = Array.from(new Set(initialCurrencies.map(c => c.value)))
            .map(value => new CurrencyId(value));
        
        return new UserCurrency(new UserId(id), uniqueCurrencies);
    }

    addNewCurrency(currencyId: CurrencyId): void {
        if (!this.currencies.find(id => id.value === currencyId.value)) {
            this.currencies.push(currencyId);
        } else {
            throw new Error('Already have this coin');
        }
    }

    removeCurrency(currencyId: CurrencyId): void {
        const index = this.currencies.findIndex(id => id.value === currencyId.value);
        if (index !== -1) {
            this.currencies.splice(index, 1);
        } else {
            throw new Error('Dont hava this coint');
        }
    }

    getCurrencies(): CurrencyId[] {
        return [...this.currencies];
    }

    toJSON() {
        return {
            id: this.id.value,
            currencies: this.currencies.map(currencyId => currencyId.value),
        };
    }
}
