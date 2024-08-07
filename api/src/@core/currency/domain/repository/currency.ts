import Repository from "../../../commom/domain/repository";
import Currency from "../models/currency";

export default interface CurrencyRepository extends Repository {
    create(currency: Currency): Promise<void>
    update(currency: Currency): Promise<void>
    updateMany(currency: Currency[]): Promise<void>
    getAll(): Promise<Array<Currency>>
    getById(currencyId: string): Promise<Currency | null>
    getByIds(currenciesIds: string[]): Promise<Array<Currency>>
}
