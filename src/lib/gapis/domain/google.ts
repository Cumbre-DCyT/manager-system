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
	}) => void;
}
