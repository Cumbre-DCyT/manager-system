export interface FormEvent {
	formID?: string;
	questions: FormQuestion[];
}

export interface FormQuestion {
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

export enum ChoiceType {
	CHOICE_TYPE_UNSPECIFIED,
	RADIO,
	CHECKBOX,
	DROP_DOWN
}
