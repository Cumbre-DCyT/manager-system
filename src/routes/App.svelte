<script lang="ts">
	import Navbar from '../components/Navbar.svelte';
	import { GApisService } from '$lib';
	import { EventsRepository } from '$lib/events/eventsRepository';
	import { env } from '$env/dynamic/public';

	const googleServie = new GApisService(
		env.PUBLIC_API_KEY,
		env.PUBLIC_CLIENT_ID,
		'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/forms.body'
	);

	const eventRepository = new EventsRepository();

	function gsiLoaded() {
		googleServie.gsiLoaded();
	}

	function gapiLoaded() {
		googleServie.gapiLoaded();
	}

	function createForm() {
		googleServie.authRequestGoogle(async () => {
			eventRepository.createEvent();
		});
	}
</script>

<svelte:head>
	<script src="https://apis.google.com/js/api.js" async defer on:load={gapiLoaded}></script>
	<script src="https://accounts.google.com/gsi/client" async defer on:load={gsiLoaded}></script>
</svelte:head>

<Navbar />
<h1>APP</h1>
<button on:click={createForm}>Create Form</button>
<!-- 
const newEvent: event = {
	name: 'Nuevo Formulario',
	formId: ''
};

if (!window.gapi.client.forms) return;
try {
	const response = await window.gapi.client.forms.forms.create({
		resource: {
			info: {
				title: newEvent.name,
				description: ''
			}
		}
	});

	console.log(window.gapi.client.forms.forms);

	if (!response) return;

	if (response.status == 200) {
		const response_2 = await window.gapi.client.forms.forms.batchUpdate({
			formId: response.result.formId,
			requests: [
				{
					createItem: {
						item: {
							title: 'Nombre',
							description: 'Indique su apellido',
							questionItem: {
								question: {
									textQuestion: {
										paragraph: false
									}
								}
							}
						},
						location: {
							index: 0
						}
					}
				}
			]
		});

		console.log(response_2);
	}
} catch (e) {
	console.log(e);
} -->
