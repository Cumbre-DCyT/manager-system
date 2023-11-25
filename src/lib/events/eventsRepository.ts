import type { NewEvent, Event } from './domain/event';
import type { EventDataSourceFormGoogle } from './eventsDataSourceGoogle';

export class EventsRepository {
	private eventDataSource: EventDataSourceFormGoogle;

	constructor(eventDataSource: EventDataSourceFormGoogle) {
		this.eventDataSource = eventDataSource;
	}

	processEventLocalStorage(event: Event): Event[] {
		const eventsLocalStorage = window.localStorage.getItem('events') as string | null;

		const events = eventsLocalStorage ? JSON.parse(eventsLocalStorage) : [];

		events.push(event);

		window.localStorage.setItem('events', JSON.stringify(events));

		return events;
	}

	async createEvent(newEvent: NewEvent): Promise<Event> {
		const event = await this.eventDataSource.createEvent(newEvent);

		this.processEventLocalStorage(event);

		return event;
	}
}
