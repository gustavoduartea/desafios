import ExchangeCoinGateway, { ExcangeCoinGatewayOutput } from "../../../currency/application/gateway/exchange-coin";

export default class GetCoinFakeGateway implements ExchangeCoinGateway {
    async getByCoin(): Promise<ExcangeCoinGatewayOutput[]> {
        return [
            {
                high: 2,
                low: 2,
                open: 2,
                time: new Date().getTime()
            },
            {
                high: 2.1,
                low: 2.1,
                open: 2.1,
                time: new Date().getTime()
            }
        ]
    }    
}
