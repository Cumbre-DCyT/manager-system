<script lang="ts">
	import { goto } from '$app/navigation';
	import authStore from '$lib/auth/aplication/authStore';

	async function logOut() {
		await authStore.logOut();
		goto('/');
	}
</script>

<svelte:head>
	<script src="https://accounts.google.com/gsi/client" async defer></script>
	<script src="https://apis.google.com/js/api.js" async defer></script>
</svelte:head>

<button on:click={logOut}>Salir</button>

<h1>APP</h1>

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
