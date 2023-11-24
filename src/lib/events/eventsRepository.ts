import { EventDataSourceFormGoogle } from './eventsDataSourceGoogle';

export class EventsRepository {
	private eventDataSource = new EventDataSourceFormGoogle();

	// function processEventLocalStorage(event: event): event[] {
	// 	const eventsLocalStorage = window.localStorage.getItem('events') as string | null;
	// 	let events = eventsLocalStorage ? JSON.parse(eventsLocalStorage) : [event];
	// 	events.push(event);
	// 	window.localStorage.setItem('events', JSON.stringify(events));
	// 	return events;
	// }

	createEvent() {
		this.eventDataSource.createEvent();
	}
}
