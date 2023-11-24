export interface Forms {
	forms: {
		create: (data: CreateFormData) => Promise<CreateFormResponse>;
		batchUpdate: (data: BatchUpdateFormData) => Promise<BatchUpdateFormResponse>;
	};
}

export interface CreateFormData {
	resource: {
		info: {
			description: string;
			title: string;
		};
	};
}

export interface CreateFormResponse {
	status: number;
	result: {
		error?: {
			message: string;
			status: string;
			code: number;
		};
		formId: string;
		responseId: string;
	};
}

export interface BatchUpdateFormData {
	formId: string;
	requests: Request[];
}

export interface Request {
	createItem: CreateItem;
}

export interface CreateItem {
	item: Item;
	location: {
		index: number;
	};
}

export interface Item {
	title: string;
	description: string;
	questionItem?: QuestionItem;
}

export interface QuestionItem {
	question: {
		required: boolean;
		textQuestion?: { paragraph: boolean };
	};
}

export interface BatchUpdateFormResponse {
	replies: Reply[];
}

export interface Reply {
	createItem: CreateItemReply;
}

export interface CreateItemReply {
	itemID: string;
	questionID: string[];
}
