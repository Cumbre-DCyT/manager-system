import { googleAuthClient } from '$lib';
import { redirect } from '@sveltejs/kit';

export async function GET({ url, cookies }) {
	const code = url.searchParams.get('code') as string;

	const { tokens } = await googleAuthClient.getToken(code);

	googleAuthClient.setCredentials(tokens);

	cookies.set('token', tokens.access_token as string, { sameSite: true });
	cookies.set('refresh_token', tokens.refresh_token as string, { sameSite: true });

	throw redirect(302, '/');
}
