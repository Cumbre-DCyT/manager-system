import type { AuthClient, TokenResponse } from './domain/google';

export class GApisService {
	private discoveryDocs = 'https://forms.googleapis.com/$discovery/rest?version=v1';

	private authClient?: AuthClient;

	apiKey: string;
	clientID: string;
	scope: string;

	gapiInited = false;
	gisInited = false;

	constructor(apiKey: string, clientID: string, scope: string) {
		this.apiKey = apiKey;
		this.clientID = clientID;
		this.scope = scope;
	}

	authRequestGoogle(callback: () => Promise<void>) {
		if (!this.authClient) return;
		this.authClient.callback = async (tokenResponse: TokenResponse) => {
			if (tokenResponse.error !== undefined) {
				throw tokenResponse;
			}
			await callback();
		};
		if (window.gapi.client.getToken() === null) {
			this.authClient.requestAccessToken({ prompt: 'consent' });
		} else {
			this.authClient.requestAccessToken({ prompt: '' });
		}
	}

	gapiLoaded() {
		window.gapi.load('client', async () => {
			await window.gapi.client.init({
				apiKey: this.apiKey,
				discoveryDocs: [this.discoveryDocs]
			});
		});
	}

	async gsiLoaded() {
		this.authClient = window.google.accounts.oauth2.initTokenClient({
			client_id: this.clientID,
			scope: this.scope,
			callback: ''
		});

		this.gisInited = true;
	}
}
