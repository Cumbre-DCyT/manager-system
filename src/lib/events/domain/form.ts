export interface FormEvent {
	formId?: string;
	questions: FormQuestion[];
}

export interface FormQuestion {
	itemId?: string;
	questionId?: string;
	type: string;
	title: string;
	required: boolean;
	choice?: {
		type: ChoiceType;
		options: {
			value: string;
			isOther: false;
		}[];
	};
	fileUpload?: {
		folderId: string;
	};
}

enum ChoiceType {
	CHOICE_TYPE_UNSPECIFIED,
	RADIO,
	CHECKBOX,
	DROP_DOWN
}
