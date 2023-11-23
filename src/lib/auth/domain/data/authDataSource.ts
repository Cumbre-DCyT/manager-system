import type { User } from '..';

export interface AuthDataSource {
	loginGoogle(): Promise<boolean>;
	logOut(): Promise<boolean>;
	checkUser(): Promise<User | null>;
}
