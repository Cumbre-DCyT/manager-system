import { googleAuthClient } from '$lib';
import { redirect } from '@sveltejs/kit';
import { google } from 'googleapis';
import { templates } from '$lib/data/templates';

import { processQuestionToRequest } from '$lib/formLib/processQuestionToRequest.js';

export async function POST({ cookies, request }) {
	const token = cookies.get('token') as string;
	const refresh_token = cookies.get('refresh_token') as string;

	const { formTitle, formType } = await request.json();

	console.log(formTitle, formType);

	if (!formTitle || !formType) {
		return new Response(
			JSON.stringify({
				error: 'one field required',
				status: 400
			})
		);
	}

	if (!token || !refresh_token) throw redirect(302, '/api/google');

	googleAuthClient.setCredentials({
		access_token: token,
		refresh_token
	});

	const { forms } = google.forms({ version: 'v1', auth: googleAuthClient });

	try {
		const template = templates.filter((template) => template.name === formType)[0];

		const { data: responseCreateDate } = await forms.create({
			requestBody: {
				info: {
					documentTitle: formTitle,
					title: formTitle
				}
			}
		});

		const { data: responseBatchUpdate } = await forms.batchUpdate({
			formId: responseCreateDate.formId!,
			requestBody: {
				includeFormInResponse: true,
				requests: processQuestionToRequest(template.questions)
			}
		});

		return new Response(
			JSON.stringify({
				data: responseBatchUpdate,
				status: 200
			}),
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
	} catch (err) {
		let message = 'An error occurred';

		if (err instanceof Error) {
			message = err.message;
		}

		console.log(err);

		return new Response(
			JSON.stringify({
				error: message,
				status: 400
			}),
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
	}
}
