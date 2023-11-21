import type { User } from '..';

export interface AuthDataSource {
	loginGoogle(): Promise<boolean>;
	logOut(): Promise<User>;
	checkUser(): Promise<User>;
}
