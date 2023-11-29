export interface FormEvent {
	formId?: string;
	questions: FormQuestion[];
	responses?: FormEventResponse[];
}

export interface FormQuestion {
	title: string;
	type: string;
	required: boolean;

	//Nombre de la propiedad que va a tener en la base de datos
	propertyName: string;

	//Viene de la api de google para relacionarlo
	itemId?: string;
	questionId?: string;

	//Si es del tipo selección
	choice?: {
		type: ChoiceType;
		options: {
			value: string;
			isOther: false;
		}[];
	};

	//Si es del tipo fileUpload
	fileUpload?: {
		folderId: string;
	};
}

export interface FormEventResponse {
	[index: string]: {
		index?: number;
		value: string;
		questionId: string;
	};
}

enum ChoiceType {
	CHOICE_TYPE_UNSPECIFIED,
	RADIO,
	CHECKBOX,
	DROP_DOWN
}
