import type { AuthDataSource, AuthRepository, User } from '../domain';
import { AuthDataSourceImplementation } from './authDataSourceImplementation';

export class AuthRepositoryImplementation implements AuthRepository {
	protected authDataSource: AuthDataSource;

	constructor(authDataSource?: AuthDataSource) {
		this.authDataSource = authDataSource ?? new AuthDataSourceImplementation();
	}

	loginGoogle(): Promise<boolean> {
		return this.authDataSource.loginGoogle();
	}
	logOut(): Promise<boolean> {
		return this.authDataSource.logOut();
	}
	checkUser(): Promise<User | null> {
		return this.authDataSource.checkUser();
	}
}
