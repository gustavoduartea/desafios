import Token, { TokenJsonWebToken, TokenId } from "./token";
import { UserId } from "./user";
import jwt from 'jsonwebtoken';

describe('Token', () => {
    const userId = new UserId();
    const tokenId = new TokenId();
    let token: Token;
    let tokenJsonWebToken: TokenJsonWebToken;

    beforeEach(() => {
        tokenJsonWebToken = new TokenJsonWebToken();
        token = new Token(tokenId, new UserId() ,tokenJsonWebToken);
    });

    test('should create a Token instance and delegate methods to TokenJsonWebToken', () => {
        expect(token).toBeInstanceOf(Token);
        expect(token.getToken()).toBe(tokenJsonWebToken);
    });

    test('should validate a token correctly', () => {
        const generatedToken = new Token(new TokenId, userId);
        const validatedUserId = token.validate(generatedToken.value);

        expect(validatedUserId).toEqual(userId);
    });

    test('should throw an error if token validation fails', () => {
        const invalidToken = 'invalidToken';

        expect(() => token.validate(invalidToken)).toThrow();
    });
});
