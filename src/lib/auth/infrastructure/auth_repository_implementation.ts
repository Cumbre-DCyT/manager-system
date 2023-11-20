import type { AuthDataSource, AuthRepository, User } from '../domain';
import { AuthDataSourceImplementation } from './auth_data_source_implementation';

export class AuthRepositoryImplementation implements AuthRepository {
	protected authDataSource: AuthDataSource;

	constructor(authDataSource?: AuthDataSource) {
		this.authDataSource = authDataSource ?? new AuthDataSourceImplementation();
	}

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
