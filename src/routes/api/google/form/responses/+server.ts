import { error, redirect } from '@sveltejs/kit';
import { googleAuthClient } from '$lib';
import { google } from 'googleapis';

export async function GET({ cookies, url }) {
	const formId = url.searchParams.get('formId');

	if (typeof formId !== 'string' || !formId) throw error(400, 'formId no exist');

	const token = cookies.get('token') as string;
	const refresh_token = cookies.get('refresh_token') as string;

	if (!token || !refresh_token) throw redirect(302, '/api/google');

	googleAuthClient.setCredentials({
		access_token: token,
		refresh_token
	});

	const { forms } = google.forms({ version: 'v1', auth: googleAuthClient });

	try {
		const { data } = await forms.responses.list({
			formId
		});
		return new Response(
			JSON.stringify({
				data,
				status: 200
			})
		);
	} catch (err) {
		let message = 'An error occurred';

		if (err instanceof Error) {
			message = err.message;
		}

		return new Response(
			JSON.stringify({
				error: message,
				status: 400
			})
		);
	}
}
