import type { FormEventResponse, FormResponse, Reply, Request as RequestGoogleApi } from '$lib';
import type { FormQuestion } from '.';

export * from './formTypes';

export async function processQuestionToRequest(
	questions: FormQuestion[]
): Promise<RequestGoogleApi[]> {
	return questions.map((item, index) => {
		const request: RequestGoogleApi = {
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

export async function processRepliesToQuestion(
	replies: Reply[],
	questions: FormQuestion[]
): Promise<FormQuestion[]> {
	return replies.map((reply, index) => {
		questions[index].itemId = reply.createItem.itemId;
		questions[index].questionId = reply.createItem.questionId[0];
		return questions[index];
	});
}

export async function processResponseGoogleToResponseEvent(
	responses: FormResponse[],
	questions: FormQuestion[]
): Promise<FormEventResponse[]> {
	return responses.map((response) => {
		const newResponse: FormEventResponse = {};

		questions.forEach((question, index) => {
			if (!question.propertyName) return;

			const { answers } = response;

			for (const property in answers) {
				if (answers[property].questionId === question.questionId) {
					newResponse[question.propertyName] = {
						index,
						questionId: question.questionId,
						value: answers[property].textAnswers.answers[0].value
					};
				}
			}
		});

		return newResponse;
	});
}
