import type { AuthDataSource, User } from '../domain';

export class AuthDataSourceImplementation implements AuthDataSource {
	loginGoogle(): Promise<User> {
		throw new Error('Method not implemented.');
	}
	logOut(): Promise<User> {
		throw new Error('Method not implemented.');
	}
	checkUser(): Promise<User> {
		throw new Error('Method not implemented.');
	}
}
