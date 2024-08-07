import Token from "../token";

export default interface TokenRepository {
    save(user: Token): Promise<void>
    getByToken(token: string): Promise<null | Token>
}
