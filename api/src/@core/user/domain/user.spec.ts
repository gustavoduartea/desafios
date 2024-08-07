import User, { SignUpCommand, UserId } from "./user";
import Email from "./email";
import { PasswordFactory } from "./password";
import Token from "./token";
import PasswordDontMatch from "../exceptions/invalid-price";
import UUID from "../../commom/domain/value-object/uuid";

describe('User', () => {
    const email = 'test@example.com';
    const password = 'password123';
    const invalidPassword = 'wrongpassword';

    let user: User;

    beforeEach(() => {
        user = User.signUp({ email, password });
    });

    test('should create a User with signUp', () => {
        const command: SignUpCommand = { email, password };
        const newUser = User.signUp(command);

        expect(newUser).toBeInstanceOf(User);
        expect(newUser.getId()).toBeInstanceOf(UUID);
        expect(newUser.email.getValue()).toBe(email);
        expect(newUser.password.value.length).toBeGreaterThan(10);
    });

    test('should authenticate a user with correct password', () => {
        const token = user.authenticate(password);
        expect(token).toBeInstanceOf(Token);
    });

    test('should throw PasswordDontMatch exception for incorrect password', () => {
        user.password = PasswordFactory.create(password);

        expect(() => user.authenticate(invalidPassword)).toThrow(PasswordDontMatch);
    });
});
