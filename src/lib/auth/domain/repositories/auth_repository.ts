import type { User } from '..';

export interface AuthRepository {
	loginGoogle(): Promise<User>;
	logOut(): Promise<User>;
	checkUser(): Promise<User>;
}
