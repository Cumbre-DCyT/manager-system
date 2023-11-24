// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { GoogleApis } from '$lib/gapis/domain/gapis';
import type { Google } from '$lib/gapis/domain/google';

declare global {
	interface Window {
		google: Google;
		gapi: GoogleApis;
	}
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
