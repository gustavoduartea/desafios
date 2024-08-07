import ExchangeCoinGateway, { ExcangeCoinGatewayOutput } from "../../../currency/application/gateway/exchange-coin";
import ClientHttp from "../http/client/protocol";

interface DataPoint {
    time: number;
    high: number;
    low: number;
    open: number;
    volumefrom: number;
    volumeto: number;
    close: number;
    conversionType: string;
    conversionSymbol: string;
}

interface Data {
    Aggregated: boolean;
    TimeFrom: number;
    TimeTo: number;
    Data: DataPoint[];
}

interface Response {
    Response: string;
    Message: string;
    HasWarning: boolean;
    Type: number;
    RateLimit: Record<string, unknown>;
    Data: Data;
}

export default class CryptoCompare implements ExchangeCoinGateway {
    constructor(
        private readonly clientHttp: ClientHttp
    ) {}

    async getByCoin(coin: string): Promise<ExcangeCoinGatewayOutput[]> {
        const response = await this.clientHttp.get<Response>(`https://min-api.cryptocompare.com/data/v2/histoday?fsym=${coin}&tsym=BRL`)

        if(response.data.Response === 'Error') {
            throw new Error(`Crypto compare return error: ${JSON.stringify(response.data)}`)
        }

        return response.data.Data.Data.map(item => ({
            high: item.high,
            low: item.low,
            open: item.open,
            time: item.time
        }))
    }
}
