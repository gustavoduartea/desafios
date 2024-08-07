import UUID from "./value-object/uuid";

export default abstract class Entity {
    private readonly events: Event[] = []

    constructor(
        protected readonly id: UUID
    ) {}

    getId() {
        return this.id;
    }

    addEvent(
        ...events: Event[]
    ) {
        events.forEach(item => this.events.push(item))
    }

    getEvents() {
        return this.events
    }
}