import type { Writable } from 'svelte/store';
import type { AuthStateInterface } from '..';

export interface AuthContextInterface {
	state: Writable<AuthStateInterface>;
	login: () => Promise<void>;
	logOut: () => Promise<void>;
}
