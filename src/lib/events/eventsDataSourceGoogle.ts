import type { Forms, Request } from '$lib/gapis/domain/Apis';
import type { FormQuestion } from './domain/form';

export class EventDataSourceFormGoogle {
	private formsApi?: Forms;

	constructor(formsApi?: Forms) {
		this.formsApi = formsApi ?? window.gapi.client.forms;
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

			return request;
		});
	}

	async createEvent() {
		if (!this.formsApi) throw Error('No api load in global window');

		const {
			result: { formId, error },
			status
		} = await this.formsApi.forms.create({
			resource: {
				info: {
					title: 'Titulo',
					description: ''
				}
			}
		});

		if (error) throw Error(error.message);

		if (status === 200) {
			const { replies } = await this.formsApi.forms.batchUpdate({
				formId,
				requests: this.processQuestionToRequest([
					{ required: true, title: 'Titulo X', type: 'textQuestion' }
				])
			});

			console.log(replies);
		}
	}
}
