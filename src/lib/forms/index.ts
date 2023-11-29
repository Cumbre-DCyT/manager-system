import type { FormEventResponse, FormResponse, Reply, Request as RequestGoogleApi } from '$lib';
import type { FormQuestion } from '.';

export * from './formTypes';

/**
 * Process an array of form questions and convert them into an array of Google API requests.
 * @param questions - The array of form questions.
 * @returns An array of Google API requests.
 */
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

		switch (item.type) {
			case 'textQuestion':
				request.createItem.item.questionItem = {
					question: {
						required: item.required,
						textQuestion: {
							paragraph: false
						}
					}
				};
				break;

			case 'dateQuestion':
				request.createItem.item.questionItem = {
					question: {
						required: item.required,
						dateQuestion: {
							includeYear: true,
							includeTime: false
						}
					}
				};
				break;

			case 'choiceQuestion':
				if (item.choice !== undefined) {
					request.createItem.item.questionItem = {
						question: {
							required: item.required,
							choiceQuestion: {
								options: item.choice.options.map((item) => item),
								shuffle: false,
								type: item.choice.type
							}
						}
					};
				}
				break;

			case 'uploadQuestion':
				if (item.fileUpload !== undefined) {
					request.createItem.item.questionItem = {
						question: {
							required: item.required,
							fileUploadQuestion: {
								folderId: item.fileUpload.folderId
							}
						}
					};
				}
				break;
		}

		return request;
	});
}

export async function processRepliesToQuestion(
	replies: Reply[],
	questions: FormQuestion[]
): Promise<FormQuestion[]> {
	return replies.map((reply, index) => {
		const question = questions[index];
		question.itemId = reply.createItem.itemId;
		question.questionId = reply.createItem.questionId[0];
		return question;
	});
}

export async function processResponseGoogleToResponseEvent(
	responses: FormResponse[],
	questions: FormQuestion[]
): Promise<FormEventResponse[]> {
	return responses.map((response) => {
		const newResponse: FormEventResponse = {};

		questions.forEach((question, index) => {
			if (!question.propertyName || !question.questionId) return;

			const { answers } = response;

			const matchingAnswer = Object.values(answers).find(
				(answer) => answer.questionId === question.questionId
			);

			if (matchingAnswer) {
				newResponse[question.propertyName] = {
					index,
					questionId: question.questionId,
					value: matchingAnswer.textAnswers.answers[0].value
				};
			}
		});

		return newResponse;
	});
}
