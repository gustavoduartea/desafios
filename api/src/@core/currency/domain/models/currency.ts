
import AggregateRoot from "../../../commom/domain/aggregate";
import UUID from "../../../commom/domain/value-object/uuid";
import Price from "./price";

export class CurrencyId extends UUID {}

export default class Currency extends AggregateRoot {
    constructor(
        id: CurrencyId,
        private readonly name: string,
        private symbol: string,
        private price: Price,
        private priceChangePercentage24h: number,
    ) {
        super(id)
    }

    static create(
        name: string, symbol: string, price: number, priceChangePercentage24h: number
    ) {
        return new Currency(new CurrencyId(), name, symbol, new Price(price), priceChangePercentage24h)
    }

    adjustPrice(newPrice: number): void {
        this.price = new Price(newPrice);
    }

    adjustPriceChangePercentage24h(lastRelease: number) {
        const percentageChange = ((this.price.value - lastRelease) / lastRelease) * 100;
        this.priceChangePercentage24h = percentageChange
    }

    toJSON() {
        return {
            id: this.id.value,
            name: this.name,
            symbol: this.symbol,
            currentPrice: this.price.value,
            priceChangePercentage24h: this.priceChangePercentage24h
        };
    }
}
