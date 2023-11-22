import type { User } from '..';

export interface AuthRepository {
	loginGoogle(): Promise<boolean>;
	logOut(): Promise<boolean>;
	checkUser(): Promise<User | null>;
}
