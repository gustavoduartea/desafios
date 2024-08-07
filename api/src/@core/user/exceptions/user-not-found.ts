import DomainError from "../../commom/domain/domain-error";

export default class UserNotFound extends DomainError {
    constructor(email: string) {
        super(`${email} not exists`)
    }
}