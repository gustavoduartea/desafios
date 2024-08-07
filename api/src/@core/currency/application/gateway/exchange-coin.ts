export type ExcangeCoinGatewayOutput = {
    "time": number,
    "high": number,
    "low": number,
    "open": number,
}

export default interface ExchangeCoinGateway {
    getByCoin(coin: string): Promise<ExcangeCoinGatewayOutput[]>
}
