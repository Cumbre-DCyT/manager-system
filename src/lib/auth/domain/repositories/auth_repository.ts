import type { User } from '..';

export interface AuthRepository {
	loginGoogle(): Promise<boolean>;
	logOut(): Promise<User>;
	checkUser(): Promise<User>;
}
