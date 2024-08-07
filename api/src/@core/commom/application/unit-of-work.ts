import AggregateRoot from "../domain/aggregate";
import Repository from "../domain/repository";

export interface DbSet {
    getRepository(repo: string): typeof Repository
}
  
export interface UnitOfWork {
    beginTransaction(): Promise<void>;
    commit(): Promise<void>;
    rollback(): Promise<void>;
    getRepository<T extends Repository>(repo: string): T
}

export interface UnitOfWorkFactory {
    create(): UnitOfWork
}