import DomainError from "../../commom/domain/domain-error";

export default class EmailAlreadyExists extends DomainError {
    constructor(
        email: string
    ) {
        super(`${email} already exists`)
    }
}