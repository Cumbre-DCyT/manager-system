export interface Google {
	accounts: Accounts;
}

export interface Accounts {
	oauth2: Oauth2;
}

export interface Oauth2 {
	initTokenClient: ({
		client_id,
		scope,
		callback
	}: {
		client_id: string;
		scope: string;
		callback: string;
	}) => AuthClient;
}

export interface TokenResponse {
	accessToken: string;
	tokenType: string;
	expiresIn: number;
	scope: string;
	authuser: string;
	prompt: string;
	error?: {
		status: number;
		message: string;
	};
}

export interface AuthClient {
	m: string;
	o: O;
	l: string;
	u: boolean;
	callback: string | ((Token: TokenResponse) => Promise<void>);
	requestAccessToken: ({ prompt }: { prompt: string }) => void;
}

export interface O {
	clientID: string;
	scope: string;
}
