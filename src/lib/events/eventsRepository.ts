import type { FormEvent } from '.';
import type { NewEvent, Event } from './domain/event';
import type { EventDataSourceFormGoogle } from './eventsDataSourceGoogle';

export class EventsRepository {
	private eventDataSource: EventDataSourceFormGoogle;

	constructor(eventDataSource: EventDataSourceFormGoogle) {
		this.eventDataSource = eventDataSource;
	}

	setEventsFromLocalStorage(events: Event[]): Event[] {
		window.localStorage.setItem('events', JSON.stringify(events));
		return events;
	}

	getEventsFromLocalStorage(): Event[] {
		const eventsLocalStorage = window.localStorage.getItem('events') as string | null;
		return eventsLocalStorage ? JSON.parse(eventsLocalStorage) : [];
	}

	updateEventFromLocalStorageByForm(formId: string, formUpdate: FormEvent): Event[] {
		const events = this.getEventsFromLocalStorage();
		const eventIndexDelete = events.findIndex((event) => event.form.formId === formId);
		const event = events[eventIndexDelete];
		event.form.responses = formUpdate.responses;
		events[eventIndexDelete] = event;
		return this.setEventsFromLocalStorage(events);
	}

	processEventLocalStorage(event: Event): Event[] {
		const events = this.getEventsFromLocalStorage();
		events.push(event);
		return this.setEventsFromLocalStorage(events);
	}

	async createEvent(newEvent: NewEvent): Promise<Event> {
		const event = await this.eventDataSource.createEvent(newEvent);
		this.processEventLocalStorage(event);
		return event;
	}

	getEvents(): Event[] {
		return this.getEventsFromLocalStorage();
	}

	getOneEvent(eventId: string): Event {
		const events = this.getEventsFromLocalStorage();
		return events.filter((event) => event.id === eventId)[0];
	}

	async get(form: FormEvent) {
		const formUpdate = await this.eventDataSource.getAsisten(form);
		if (!formUpdate.formId) return;
		this.updateEventFromLocalStorageByForm(formUpdate.formId, formUpdate);
		return formUpdate.responses;
	}
}
