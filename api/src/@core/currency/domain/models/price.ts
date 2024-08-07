import InvalidPrice from "../exceptions/invalid-price";

export default class Price {
    constructor(
        readonly value: number
    ) {
        if(value <= 0) {
            throw new InvalidPrice()
        }
    }
}
