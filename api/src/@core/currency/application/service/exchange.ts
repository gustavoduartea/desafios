import { UnitOfWorkFactory } from "../../../commom/application/unit-of-work";
import CurrencyRepository from "../../domain/repository/currency";
import ExchangeCoinGateway from "../gateway/exchange-coin";

export default class ExcangeCoinApplicationService {
    constructor(
        private readonly exchangeCoinGateway: ExchangeCoinGateway,
        private readonly unitOfWorkFactory: UnitOfWorkFactory
    ) {}

    async fixValues() {
        const uow = this.unitOfWorkFactory.create()

        try {
            const repository = uow.getRepository<CurrencyRepository>('currency')
            const coins = await repository.getAll()
    
            uow.beginTransaction()
    
            for(const coin of coins) {
                const response = await this.exchangeCoinGateway.getByCoin(coin.toJSON().name)
    
                const lastIndex = response.length - 1
    
                const todayCoin = response[lastIndex]
                const lastDayCoin = response[lastIndex - 1]
    
                coin.adjustPrice(todayCoin.open)
                coin.adjustPriceChangePercentage24h(lastDayCoin.open)
                await repository.update(coin)
            }

            uow.commit()
        } catch(err) {
            uow.rollback()
        }
    }
}
