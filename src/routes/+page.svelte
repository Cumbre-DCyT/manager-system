<script lang="ts">
	import CreateForm from '$lib/components/CreateForm.svelte';
	import ButtonGetAccess from '$lib/components/ButtonGetAccess.svelte';
	import ListOfResponses from '$lib/components/ListOfResponses.svelte';
	import CreateEvent from '$lib/components/CreateEvent.svelte';

	import type { Event } from '$lib/formLib';
	import { onMount } from 'svelte';

	function loadEventsFromLocalStorage(): Event[] {
		const data = localStorage.getItem('events');
		const events = JSON.parse(data ?? '[]');
		if (!Array.isArray(events)) throw Error('events must be an array');
		return events;
	}

	function saveEventToLocalStorage(event: Event) {
		events = [...events, event];
		localStorage.setItem('events', JSON.stringify(events));
	}

	function eventUpdated(event: Event) {
		events = events.map((e) => (e.id === event.id ? event : e));
		localStorage.setItem('events', JSON.stringify(events));
	}

	let events: Event[] = [];

	onMount(() => {
		events = loadEventsFromLocalStorage();
	});
</script>

<ButtonGetAccess />
<div class="grid md:grid-cols-2 gap-2 p-2">
	<div class="md:flex">
		<CreateEvent {saveEventToLocalStorage} />
		<CreateForm {events} {eventUpdated} />
	</div>
	<ListOfResponses {events} {eventUpdated} />
</div>
