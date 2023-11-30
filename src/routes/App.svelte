<script lang="ts">
	import { ChoiceType, GApisService, type Event, type FormEvent } from '$lib';
	import { env } from '$env/dynamic/public';

	import type { NewEvent } from '$lib/events/domain/event';
	import { EventsRepository } from '$lib/events/eventsRepository';
	import { EventDataSourceFormGoogle } from '$lib/events/eventsDataSourceGoogle';

	import { templates } from '../lib/data/templates';

	const googleServie = new GApisService(
		env.PUBLIC_API_KEY,
		env.PUBLIC_CLIENT_ID,
		'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/forms.body'
	);

	let loading = true;

	let events: Event[];
	let responses;

	let eventDataSource: EventDataSourceFormGoogle;
	let eventRepository: EventsRepository;

	function gsiLoaded() {
		googleServie.gsiLoaded();
	}

	async function gapiLoaded() {
		await googleServie.gapiLoaded(() => {
			let apiForm = window.gapi.client.forms;

			eventDataSource = new EventDataSourceFormGoogle(apiForm);
			eventRepository = new EventsRepository(eventDataSource);

			loading = false;
		});
	}

	function createForm() {
		googleServie.authRequestGoogle(async () => {
			loading = true;

			const newEvent: NewEvent = {
				title: 'Titulo del evento',
				form: {
					questions: templates[0].questions
				}
			};

			await eventRepository.createEvent(newEvent);

			loading = false;
		});
	}

	function getEvents() {
		events = eventRepository.getEvents();
	}

	async function get(form: FormEvent) {
		googleServie.authRequestGoogle(async () => {
			responses = await eventRepository.get(form);
			console.log(responses);
		});
	}
</script>

<svelte:head>
	<script src="https://apis.google.com/js/api.js" async defer on:load={gapiLoaded}></script>
	<script src="https://accounts.google.com/gsi/client" async defer on:load={gsiLoaded}></script>
</svelte:head>

<div class="flex w-full justify-around">
	{#if loading}
		<h1>Cargando</h1>
	{:else}
		<button on:click={createForm}>Create Form</button>
	{/if}

	<div class="text-center">
		<button on:click={getEvents}>Ver lista de eventos</button>

		{#if events}
			<h1 class="text-3xl mb-2">Eventos</h1>
			{#each events as event}
				<h3>{event.title}</h3>
				<button on:click={() => get(event.form)}>Asistencias</button>
			{/each}
		{/if}
	</div>
</div>
