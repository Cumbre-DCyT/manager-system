import type { FormEvent, FormQuestion } from '../../forms/formTypes';

export interface Event {
	id?: string;
	title: string;
	form: FormEvent;
}

export interface NewEvent {
	title: string;
	form: {
		questions: FormQuestion[];
	};
}
