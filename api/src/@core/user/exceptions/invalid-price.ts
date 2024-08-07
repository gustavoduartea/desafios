export default class PasswordDontMatch extends Error {
    constructor() {
        super('Invalid password')
    }
}
