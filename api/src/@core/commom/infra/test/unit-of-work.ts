import { UnitOfWork, UnitOfWorkFactory } from "../../application/unit-of-work";
import Repository from "../../domain/repository";
import { CurrencyFakeRepository, UserFakeRepository } from "./repositories";

export class UnitOfWorkFactoryFake implements UnitOfWorkFactory {
    create(): UnitOfWork {
        const uow = new UnitOfWorkFake()
        uow.repositories.set('users', new UserFakeRepository())
        uow.repositories.set('currency', new CurrencyFakeRepository())
        return uow
    }
}

export class UnitOfWorkFake implements UnitOfWork {
    isRollbacked = false
    isCommitted = false

    readonly repositories = new Map<string, Repository>()

    async beginTransaction(): Promise<void> {
        console.log('BEGIN TRANSACTION')
    }

    async commit(): Promise<void> {
        this.isCommitted = true
    }

    async rollback(): Promise<void> {
        this.isRollbacked = true
    }

    getRepository<T extends Repository>(repo: string): T {
        return this.repositories.get(repo)! as T
    }
}
