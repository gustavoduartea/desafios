import Currency from "../../../currency/domain/models/currency";
import CurrencyRepository from "../../../currency/domain/repository/currency";
import UserRepository from "../../../user/domain/repository/user-repository";
import User from "../../../user/domain/user";

export class UserFakeRepository implements UserRepository {
    private users: User[] = []

    async getByEmail(email: string): Promise<null | User> {
        return this.users.find(user => user.email.getValue() === email) || null
    }

    async save(user: User): Promise<void> {
        this.users.push(user)
    }
}

export class CurrencyFakeRepository implements CurrencyRepository {
    private currencies: Currency[] = [
        Currency.create('BTC', 'BTC', 100, 5)
    ]

    async create(currency: Currency): Promise<void> {
        this.currencies.push(currency)
    }

    async getAll(): Promise<Array<Currency>> {
        return this.currencies
    }

    async getById(currencyId: string): Promise<Currency | null> {
        return this.currencies.find(item => item.getId().value === currencyId) || null
    }

    async getByIds(currenciesIds: string[]): Promise<Array<Currency>> {
        const set = new Set(currenciesIds)
        return this.currencies.filter(item => set.has(item.getId().value))
    }

    private getIndex(id: string) {
        return this.currencies.findIndex(item => item.getId().value)
    }

    async update(currency: Currency): Promise<void> {
        const index = this.getIndex(currency.getId().value)

        this.currencies[index] = currency
    }

    async updateMany(currencies: Currency[]): Promise<void> {
        for(const currency of currencies) {
            this.currencies[this.getIndex(currency.getId().value)] = currency
        }
    }
}
