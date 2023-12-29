import type { FormQuestion, reply } from '.';

export function processRepliesToQuestion(
	replies: reply[],
	questions: FormQuestion[]
): FormQuestion[] {
	return replies.map((reply, index) => {
		const question = { ...questions[index] };

		if (!reply.createItem) throw new Error('createItem not found');

		question.itemId = reply.createItem.itemId;

		if (!reply.createItem.questionId) throw new Error('createItem.questionId not found');

		question.questionId = reply.createItem.questionId[0];

		return question;
	});
}
