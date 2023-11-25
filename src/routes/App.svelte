<script lang="ts">
	import { GApisService } from '$lib';
	import { env } from '$env/dynamic/public';
	import { ChoiceType } from '$lib/events/domain/form';

	import type { NewEvent } from '$lib/events/domain/event';
	import { EventsRepository } from '$lib/events/eventsRepository';
	import { EventDataSourceFormGoogle } from '$lib/events/eventsDataSourceGoogle';

	const googleServie = new GApisService(
		env.PUBLIC_API_KEY,
		env.PUBLIC_CLIENT_ID,
		'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/forms.body'
	);

	let loading = true;

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
				questions: [
					{ required: true, title: 'Nombre y apellido', type: 'textQuestion' },
					{ required: true, title: 'Selecciones su fecha nacimiento', type: 'dateQuestion' },
					{ required: true, title: 'Cédula', type: 'textQuestion' },
					{ required: true, title: 'Teléfono', type: 'textQuestion' },
					{
						required: true,
						title: '¿ Pertenece a la ucla ?',
						type: 'choiceQuestion',
						choice: {
							type: ChoiceType.CHECKBOX,
							options: [{ value: 'si', isOther: false }]
						}
					},
					{ required: true, title: '¿ A que te dedicas ?', type: 'textQuestion' },
					{
						required: true,
						title: '¿ Método de pago ?',
						type: 'choiceQuestion',
						choice: {
							type: ChoiceType.CHECKBOX,
							options: [
								{ value: 'Pago móvil', isOther: false },
								{ value: 'Divisas', isOther: false },
								{ value: 'Bolivares efectivo', isOther: false }
							]
						}
					}
					// {
					// 	required: true,
					// 	type: 'uploadQuestion',
					// 	title: 'Comprobate de pago',
					// 	fileUpload: {
					// 		folderId: ''
					// 	}
					// }
				]
			};
			await eventRepository.createEvent(newEvent);
			loading = false;
		});
	}
</script>

<svelte:head>
	<script src="https://apis.google.com/js/api.js" async defer on:load={gapiLoaded}></script>
	<script src="https://accounts.google.com/gsi/client" async defer on:load={gsiLoaded}></script>
</svelte:head>

{#if loading}
	<h1>Cargando</h1>
{:else}
	<button on:click={createForm}>Create Form</button>
{/if}
