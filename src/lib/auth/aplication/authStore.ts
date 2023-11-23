import { writable } from 'svelte/store';
import { authRepository } from '..';
const userStore = writable();

authRepository.checkUser().then((user) => userStore.set(user));

export default {
	get user() {
		return userStore;
	},

	async loginGoogle() {
		const result = await authRepository.loginGoogle();
		if (result) userStore.set(await authRepository.checkUser());
	},

	async logOut() {
		const result = await authRepository.logOut();
		if (result) {
			userStore.set(null);
		}
	}
};
