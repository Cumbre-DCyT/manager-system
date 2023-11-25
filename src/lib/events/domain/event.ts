import type { FormEvent, FormQuestion } from './form';

export interface Event {
	title: string;
	Form: FormEvent;
}

export interface NewEvent {
	title: string;
	questions: FormQuestion[];
}
