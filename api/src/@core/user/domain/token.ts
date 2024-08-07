import Entity from "../../commom/domain/entity";
import UUID from "../../commom/domain/value-object/uuid";
import { UserId } from "./user";

import jwt from 'jsonwebtoken'

export class TokenId extends UUID {}

export interface TokenValueObject {
    generate(userId: string): string
    validate(token: string): UserId
}

export class TokenJsonWebToken implements TokenValueObject {
    private readonly secret = 'secret'

    generate(userId: string): string {
        const token = jwt.sign({
            userId
        }, this.secret)
        return token
    }

    validate(token: string): UserId {
        const value = jwt.verify(token, this.secret) as unknown as any

        if(!value) {
            throw new Error()
        }

        return new UserId(value.userId)
    }
}

export default class Token extends Entity {
    readonly value: string

    constructor(
        tokenId: TokenId,
        readonly userId: UserId,
        readonly token: TokenValueObject = new TokenJsonWebToken(),
    ) {
        super(tokenId)
        this.value = this.token.generate(this.userId.value)
    }

    validate(token: string) {
        return this.token.validate(token)
    }

    getToken() {
        return this.token
    }
}

