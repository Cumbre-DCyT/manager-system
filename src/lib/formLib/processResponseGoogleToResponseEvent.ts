import type { FormEventResponse, FormQuestion, response as GoogleListResponse } from '.';

export function processResponseGoogleToResponseEvent(
	responses: GoogleListResponse[],
	questions: FormQuestion[]
): FormEventResponse[] {
	return responses.map((response) => {
		const newResponse: FormEventResponse = {};

		questions.forEach((question, index) => {
			const { propertyName, questionId } = question;
			const { answers } = response;

			if (!propertyName || !questionId || !answers) return;

			const matchingAnswer = Object.values(answers).find(
				(answer) => answer.questionId === questionId
			);

			if (!matchingAnswer) return;

			const { textAnswers } = matchingAnswer;

			if (!textAnswers) return;

			const { answers: textAnswersArray } = textAnswers;

			if (!textAnswersArray || textAnswersArray.length === 0) return;
			if (!textAnswersArray[0].value) return;

			newResponse[propertyName] = {
				index,
				questionId,
				value: textAnswersArray[0].value
			};
		});

		return newResponse;
	});
}
