import type { FormQuestion, questionItem, request } from '$lib/formLib/types';

/**
 * @description Convert FormQuestion[] to request[] for Google Forms API.
 * @param questions FormQuestion[] - Array of questions to convert.
 * @returns request[] - Array of requests for Google Forms API.
 */

export function processQuestionToRequest(questions: FormQuestion[]): request[] {
	return questions.map((item, index) => {
		let questionItem: questionItem = {};
		switch (item.type) {
			case 'textQuestion':
				questionItem = {
					question: {
						required: item.required,
						textQuestion: {
							paragraph: false
						}
					}
				};
				break;
			case 'dateQuestion':
				questionItem = {
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
					questionItem = {
						question: {
							required: item.required,
							choiceQuestion: {
								options: item.choice.options.map((option) => option),
								shuffle: false,
								type: item.choice.type.toString()
							}
						}
					};
				}
				break;
			case 'uploadQuestion':
				if (item.fileUpload !== undefined) {
					questionItem = {
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
		const request: request = {
			createItem: {
				item: {
					title: item.title,
					description: '',
					questionItem
				},
				location: {
					index
				}
			}
		};
		return request;
	});
}
