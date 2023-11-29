export interface Forms {
	forms: {
		create: (data: CreateFormData) => Promise<CreateFormResponse>;
		batchUpdate: (data: BatchUpdateFormData) => Promise<BatchUpdateFormResponse>;
		responses: {
			list: (data: ResponsesFormListData) => Promise<ResponsesFormListResponse>;
		};
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

export interface ResponsesFormListData {
	formId: string;
	//timestamp > N
	//timestamp >= N
	//Ejemplos: “2014-10-02T15:01:23Z” y “2014-10-02T15:01:23.045123456Z”.
	filter?: string;
	pageSize?: number;
	pageToken?: string;
}

export interface ResponsesFormListResponse {
	result: {
		responses: FormResponse[];
		nextPageToken: string;
	};
}

export interface FormResponse {
	createTime: string;
	lastSubmittedTime: string;
	respondentEmail: string;
	answers: {
		readonly [index: string]: AnswerForm;
	};
	totalScore: number;
}

export interface AnswerForm {
	questionId: string;
	textAnswers: {
		answers: { value: string }[];
	};
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
		dateQuestion?: {
			includeYear: boolean;
			includeTime: boolean;
		};
		choiceQuestion?: {
			type: ChoiceType;
			options: ChoiceQuestionOption[];
			shuffle: boolean;
		};
		fileUploadQuestion?: {
			folderId: string;
			types?: FileType[];
			maxFiles?: number;
			maxFileSize?: string;
		};
	};
}

export enum FileType {
	FILE_TYPE_UNSPECIFIED,
	ANY,
	DOCUMENT,
	PRESENTATION,
	SPREADSHEET,
	DRAWING,
	PDF,
	IMAGE,
	VIDEO,
	AUDIO
}

export enum ChoiceType {
	CHOICE_TYPE_UNSPECIFIED,
	RADIO,
	CHECKBOX,
	DROP_DOWN
}

export interface ChoiceQuestionOption {
	value: string;
	isOther: boolean;
}

export interface BatchUpdateFormResponse {
	result: {
		replies: Reply[];
	};
}

export interface Reply {
	createItem: CreateItemReply;
}

export interface CreateItemReply {
	itemId: string;
	questionId: string[];
}
