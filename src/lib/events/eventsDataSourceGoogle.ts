import type { Forms } from '$lib/gapis/domain/Apis';

import { v4 as uuidv4 } from 'uuid';

import type { Event, NewEvent } from './domain/event';
import type { FormEvent } from '../forms/formTypes';

import {
	processQuestionToRequest,
	processRepliesToQuestion,
	processResponseGoogleToResponseEvent
} from '$lib/forms';

export class EventDataSourceFormGoogle {
	private formsApi?: Forms;

	constructor(formsApi?: Forms) {
		this.formsApi = formsApi;
	}

	async createEvent(newEvent: NewEvent): Promise<Event> {
		if (!this.formsApi) throw Error('No api load in global window');

		let questions;

		const {
			result: { formId, error },
			status
		} = await this.formsApi.forms.create({
			resource: {
				info: {
					title: newEvent.title,
					description: ''
				}
			}
		});

		if (error) throw Error(error.message);

		if (status === 200) {
			const requests = await processQuestionToRequest(newEvent.form.questions);

			const {
				result: { replies }
			} = await this.formsApi.forms.batchUpdate({
				formId,
				requests
			});

			questions = await processRepliesToQuestion(replies, newEvent.form.questions);
		}

		if (!questions) throw Error('No question');

		return {
			id: uuidv4(),
			title: newEvent.title,
			form: {
				formId,
				questions: questions
			}
		};
	}

	async getAsisten(form: FormEvent): Promise<FormEvent> {
		if (!form?.formId) throw Error('no form');

		const {
			result: { responses }
		} = await this.formsApi!.forms.responses.list({ formId: form?.formId });

		if (!responses) throw Error('No responses');

		form.responses = await processResponseGoogleToResponseEvent(responses, form.questions);

		return form;
	}
}
