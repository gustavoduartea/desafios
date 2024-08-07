export default class InvalidPrice extends Error {
    constructor() {
        super('Price cannot be less or equal than zero')
    }
}
