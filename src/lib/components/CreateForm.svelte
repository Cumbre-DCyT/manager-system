<script lang="ts">
	import { processRepliesToQuestion, type Event } from '$lib/formLib';
	import { templates } from '$lib/data/templates';

	export let events: Event[];

	export let eventUpdated: (event: Event) => void;

	async function handleSubmit(e: { currentTarget: EventTarget & HTMLFormElement }) {
		const data = new FormData(e.currentTarget);

		const indexEvent = events.findIndex((event) => event.id === data.get('eventId'));

		const event = events[indexEvent];

		const res = await fetch('api/google/form/create', {
			method: 'POST',
			body: JSON.stringify({
				formTitle: data.get('formTitle'),
				formType: event.FormEvent.formType
			})
		});

		const { data: resData } = await res.json();

		const indexTemplate = templates.findIndex(
			(template) => template.name === event.FormEvent.formType
		);

		const template = templates[indexTemplate];

		event.FormEvent = {
			...event.FormEvent,
			formId: resData.form.formId as string,
			questions: processRepliesToQuestion(resData.replies, template.questions)
		};

		eventUpdated(event);
	}

	$: verifiedEvents = events.length === 0;
</script>

<form
	method="POST"
	on:submit|preventDefault={handleSubmit}
	class="card bg-neutral w-64 mx-auto mt-2"
>
	<div class="card-body">
		<h1 class="card-title">Crear formulario</h1>
		<label class="form-control w-full max-w-xs">
			<div class="label">
				<span class="label-text">Evento</span>
			</div>
			<select
				name="eventId"
				placeholder="Evento X"
				class="select select-bordered w-full max-w-xs"
				required
				disabled={verifiedEvents}
			>
				{#if events.length === 0}
					<option value="">No hay eventos</option>
				{:else}
					{#each events as event}
						<option value={event.id}>{event.name}</option>
					{/each}
				{/if}
			</select>
		</label>
		<label class="form-control w-full max-w-xs">
			<div class="label">
				<span class="label-text">Titulo del formulario</span>
			</div>
			<input
				name="formTitle"
				disabled={verifiedEvents}
				type="text"
				placeholder="Formulario X"
				class="input input-bordered w-full max-w-xs"
				required
			/>
		</label>
		<div class=" form-control">
			<button class="btn btn-primary" type="submit" disabled={verifiedEvents}>Crear</button>
		</div>
	</div>
</form>
