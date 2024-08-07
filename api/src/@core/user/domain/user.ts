import AggregateRoot from "../../commom/domain/aggregate";
import UUID from "../../commom/domain/value-object/uuid";
import PasswordDontMatch from "../exceptions/invalid-price";
import Email from "./email";
import Password, { PasswordFactory } from "./password";
import Token from "./token";

export class UserId extends UUID {}

export type SignUpCommand = {
    email: string
    password: string
}

export default class User extends AggregateRoot {
    constructor(
        id: UserId,
        public readonly email: Email,
        public password: Password
    ) {
        super(id)
    }

    static signUp(command: SignUpCommand) {
        const password = PasswordFactory.create(command.password)
        const email = new Email(command.email)

        return new User(
            new UserId(),
            email,
            password
        )
    }

    authenticate(password: string) {
        const isValidPassword = this.password.verify(password)

        if(!isValidPassword) {
            throw new PasswordDontMatch()
        }

        return new Token(this.id, this.id)
    }
}
