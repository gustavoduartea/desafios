import bcrypt from 'bcrypt';
import { PasswordBcrypt, PasswordFactory } from './password';

describe('PasswordBcrypt', () => {
    const password = 'password123';
    const wrongPassword = 'wrongpassword';

    test('should hash and store the password correctly', () => {
        const passwordInstance = new PasswordBcrypt(password);
        expect(passwordInstance.value.length).toBeGreaterThan(22);
        expect(passwordInstance.value === password).toBeFalsy()
    });

    test('should verify the correct password', () => {
        const passwordInstance = new PasswordBcrypt(password);

        expect(passwordInstance.verify(password)).toBe(true);
    });

    test('should not verify the incorrect password', () => {
        const passwordInstance = new PasswordBcrypt(password);

        expect(passwordInstance.verify(wrongPassword)).toBe(false);
    });
});

describe('PasswordFactory', () => {
    const password = 'password123';

    test('should create a PasswordBcrypt instance', () => {
        const passwordInstance = PasswordFactory.create(password);

        expect(passwordInstance).toBeInstanceOf(PasswordBcrypt);
        expect(passwordInstance.value).toBeDefined();
        expect(passwordInstance.verify(password)).toBe(true);
    });
});
