import User from "../../domain/user";

import TokenRepository from "../../domain/repository/token-repository";
import UserRepository from "../../domain/repository/user-repository";

import EmailAlreadyExists from "../../exceptions/email-already-exists";
import UserNotFound from "../../exceptions/user-not-found";

export default class UserApplicationService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly tokenRepository: TokenRepository
    ) {}

    public async signUp(
        email: string,
        password: string
    ) {
        const user = await this.userRepository.getByEmail(email)
        if(user) { throw new EmailAlreadyExists(email) }
        const newUser = User.signUp({
            email, password
        })
        await this.userRepository.save(newUser)
    }

    public async login(
        email: string,
        password: string
    ) {
        const user = await this.userRepository.getByEmail(email)
        if(!user) {
            throw new UserNotFound(email)
        }

        const token = user.authenticate(password)
        await this.tokenRepository.save(token)

        return token.value
    }
}
