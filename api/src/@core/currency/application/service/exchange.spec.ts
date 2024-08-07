import GetCoinFakeGateway from "../../../commom/infra/test/gateway";
import { UnitOfWorkFactoryFake } from "../../../commom/infra/test/unit-of-work";
import ExcangeCoinApplicationService from "./exchange";

describe('Exchange Application Service', () => {
    let appService: ExcangeCoinApplicationService;
    let unitOfWorkFactory: UnitOfWorkFactoryFake;

    beforeEach(async () => {
        unitOfWorkFactory = new UnitOfWorkFactoryFake();

        appService = new ExcangeCoinApplicationService(
            new GetCoinFakeGateway(),
            unitOfWorkFactory
        );
    });

    test('should update the coin prices and price change percentage', async () => {
        expect(appService.fixValues()).resolves;
    });
});
