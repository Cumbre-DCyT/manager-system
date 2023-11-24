export interface FormEvent {
	formID?: string;
	questions: FormQuestion[];
}

export interface FormQuestion {
	type: string;
	title: string;
	required: boolean;
}
