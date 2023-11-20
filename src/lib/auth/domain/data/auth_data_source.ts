import type { User } from '..';

export interface AuthDataSource {
	loginGoogle(): Promise<User>;
	logOut(): Promise<User>;
	checkUser(): Promise<User>;
}
