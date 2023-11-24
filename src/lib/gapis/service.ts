import type { oauth2Interface } from './domain/google';

export class gapisService {
	private discoveryDocs = 'https://forms.googleapis.com/$discovery/rest?version=v1';

	private authClient: any;
	private apiClient: any;

	apiKey = 'AIzaSyDHyCyMN0U0HJQ6kKcBIxwDyrnbnDuW7oo';
	clientID = '69363678559-a2q8ruuaaj0jc9557iuhg8qvv2ce9h72.apps.googleusercontent.com';
	scope =
		'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/forms.body';

	gapiInited = false;
	gisInited = false;

	authRequestGoogle(callback: () => Promise<void>) {
		if (!this.authClient) return;

		this.authClient.callback = async (tokenResponse: any) => {
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
		this.apiClient.load('client', this.initializeGapiClient);
	}

	async initializeGapiClient(gapi) {
		gapi.client.init({
			apiKey: '',
			discoveryDocs: [this.discoveryDocs]
		});
		this.gapiInited = true;
	}

	gsiLoaded(oauth2: oauth2Interface) {
		this.authClient = oauth2.initTokenClient({
			client_id: this.clientID,
			scope: this.scope,
			callback: ''
		});
		this.gisInited = true;
	}
}
