import { googleAuthClient } from '$lib';

export async function POST() {
	const scopes = ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/forms'];

	const url = googleAuthClient.generateAuthUrl({
		access_type: 'offline',
		scope: scopes,
		include_granted_scopes: true,
		prompt: 'consent'
	});

	return new Response(JSON.stringify({ url }));
}
