import type { Forms, Reply, Request } from '$lib/gapis/domain/Apis';
import type { Event, NewEvent } from './domain/event';
import type { FormQuestion } from './domain/form';

export class EventDataSourceFormGoogle {
	private formsApi?: Forms;

	constructor(formsApi?: Forms) {
		this.formsApi = formsApi;
	}

	processRepliesToQuestion(replies: Reply[], questions: FormQuestion[]): FormQuestion[] {
		return replies.map((reply, index) => {
			questions[index].itemId = reply.createItem.itemId;
			questions[index].questionId = reply.createItem.questionId[0];

			return questions[index];
		});
	}

	processQuestionToRequest(questions: FormQuestion[]): Request[] {
		return questions.map((item, index) => {
			const request: Request = {
				createItem: {
					item: {
						title: item.title,
						description: ''
					},
					location: {
						index
					}
				}
			};

			if (item.type === 'textQuestion') {
				request.createItem.item.questionItem = {
					question: {
						required: item.required,
						textQuestion: {
							paragraph: false
						}
					}
				};
			}

			if (item.type === 'dateQuestion') {
				request.createItem.item.questionItem = {
					question: {
						required: item.required,
						dateQuestion: {
							includeYear: true,
							includeTime: false
						}
					}
				};
			}

			if (item.type === 'choiceQuestion' && item.choice !== undefined) {
				request.createItem.item.questionItem = {
					question: {
						required: item.required,
						choiceQuestion: {
							options: item.choice?.options.map((item) => item),
							shuffle: false,
							type: item.choice.type
						}
					}
				};
			}

			if (item.type === 'uploadQuestion' && item.fileUpload !== undefined) {
				//Creation of file_upload question not supported.
				request.createItem.item.questionItem = {
					question: {
						required: item.required,
						fileUploadQuestion: {
							folderId: item.fileUpload?.folderId
						}
					}
				};
			}

			return request;
		});
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
			const requests = this.processQuestionToRequest(newEvent.questions);

			const {
				result: { replies }
			} = await this.formsApi.forms.batchUpdate({
				formId,
				requests
			});

			questions = this.processRepliesToQuestion(replies, newEvent.questions);
		}

		if (!questions) throw Error('No question');

		return {
			title: newEvent.title,
			Form: {
				formId,
				questions: questions
			}
		};
	}
}
