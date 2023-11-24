import type { Forms } from './Apis/Forms';

export interface GoogleApis {
	load: (a: string, b: () => Promise<void>) => void;
	client: GoogleApisClient;
}

export interface GoogleApisClient {
	init: ({ apiKey, discoveryDocs }: { apiKey: string; discoveryDocs: [string] }) => void;
	getToken: () => string | null;
	forms?: Forms;
}
