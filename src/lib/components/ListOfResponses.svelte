<script lang="ts">
	import { processResponseGoogleToResponseEvent, type Event } from '$lib/formLib';

	export let events: Event[];

	export let eventUpdated: (event: Event) => void;

	async function getData(event: { currentTarget: EventTarget & HTMLFormElement }) {
		const data = new FormData(event.currentTarget);

		if (!selectEvent?.FormEvent.questions) return;

		const response = await fetch(`api/google/form/responses?formId=${data.get('formId')}`, {
			method: 'GET'
		});
		const { data: responseData } = await response.json();

		selectEvent.FormEvent.responses = processResponseGoogleToResponseEvent(
			responseData.responses,
			selectEvent?.FormEvent.questions
		);

		eventUpdated(selectEvent);
	}

	function handleEvent(e: { currentTarget: EventTarget & HTMLSelectElement }) {
		eventId = e.currentTarget.value;
	}

	$: verifiedEvents = events.length === 0;
	$: eventId = !verifiedEvents ? events[0].id : '';
	$: selectEvent = events.findLast((event) => event.id === eventId);
</script>

<div class="card bg-neutral col-span-2">
	<div class="card-body">
		<h1 class="card-title">Listado de respuestas</h1>
		<select
			class="select select-bordered select-sm w-full max-w-xs mb-2"
			disabled={verifiedEvents}
			value={eventId}
			on:change={handleEvent}
		>
			{#if events.length === 0}
				<option value="">No hay eventos</option>
			{:else}
				{#each events as event}
					<option value={event.id}>{event.name}</option>
				{/each}
			{/if}
		</select>
		<form on:submit|preventDefault={getData}>
			<div class="flex gap-2">
				<input
					value={selectEvent?.FormEvent.formId ?? ''}
					disabled={verifiedEvents}
					type="text"
					placeholder="ID"
					name="formId"
					class="input input-sm input-bordered w-full max-w-xs"
				/>
				<button class="btn btn-sm btn-primary" disabled={verifiedEvents}>Buscar</button>
			</div>
		</form>
		{#if selectEvent}
			<div class="pb-16 w-full overflow-x-auto">
				{#if selectEvent?.FormEvent.responses && selectEvent.FormEvent.responses.length === 0}
					<h1>No data</h1>
				{:else if !selectEvent?.FormEvent.responses}
					<h1>No responses in form</h1>
				{:else if selectEvent?.FormEvent.responses && selectEvent?.FormEvent.questions}
					<table class="table table-xs table-pin-rows">
						<thead>
							<tr>
								{#each selectEvent?.FormEvent.questions as question}
									<th>{question.title}</th>
								{/each}
							</tr>
						</thead>
						<tbody>
							{#each selectEvent?.FormEvent.responses as response}
								<tr>
									{#each selectEvent?.FormEvent.questions as question}
										<th>{response[question.propertyName].value}</th>
									{/each}
								</tr>
							{/each}
						</tbody>
					</table>
				{/if}
			</div>
		{/if}
		<div class="card-actions justify-end">
			<button class="btn btn-primary btn-sm" disabled={verifiedEvents}
				>Guardar como asistencias</button
			>
		</div>
	</div>
</div>
