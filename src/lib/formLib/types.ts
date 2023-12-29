import type { forms_v1 } from '@googleapis/forms';

export type request = forms_v1.Schema$Request;
export type reply = forms_v1.Schema$Response;
export type questionItem = forms_v1.Schema$QuestionItem;
export type response = forms_v1.Schema$FormResponse;

export interface Event {
	id: string;
	name: string;
	FormEvent: FormEvent;
}
export interface FormEvent {
	formId?: string;
	formType: string;
	questions?: FormQuestion[];
	responses?: FormEventResponse[];
}

export interface FormQuestion {
	title: string;
	type: string;
	required: boolean;

	//Nombre de la propiedad que va a tener en la base de datos
	propertyName: string;

	//Viene de la api de google para relacionarlo
	itemId?: string | null;
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

export enum ChoiceType {
	CHOICE_TYPE_UNSPECIFIED,
	RADIO,
	CHECKBOX,
	DROP_DOWN
}
