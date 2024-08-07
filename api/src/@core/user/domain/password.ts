import * as bcrypt from 'bcrypt'

export default interface Password {
	value: string;
	verify (password: string): boolean;
}

export class PasswordBcrypt implements Password {
    readonly value: string

    constructor(
        password: string
    ) {
        this.value = bcrypt.hashSync(password, 5)
    }

    verify(password: string): boolean {
        return bcrypt.compareSync(password, this.value)
    }
}

export class PasswordFactory {
	static create (password: string): Password {
		return new PasswordBcrypt(password)
	}
}
