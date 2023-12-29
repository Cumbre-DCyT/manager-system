<script lang="ts">
	import { templates } from '$lib/data/templates';
	import type { Event } from '$lib/formLib/types';

	export let saveEventToLocalStorage: (event: Event) => void;

	async function handleSubmit(e: { currentTarget: EventTarget & HTMLFormElement }) {
		const data = new FormData(e.currentTarget);
		const name = data.get('name');
		const formType = data.get('formType');
		if (!name || typeof name !== 'string' || !formType || typeof formType !== 'string') return;
		const event: Event = {
			id: crypto.randomUUID(),
			name,
			FormEvent: {
				formType
			}
		};
		saveEventToLocalStorage(event);
	}
</script>

<div class="card bg-neutral w-64 mx-auto mt-2">
	<form class="card-body" on:submit|preventDefault={handleSubmit}>
		<h1 class="card-title">Crear evento</h1>
		<label class="form-control w-full max-w-xs">
			<div class="label">
				<span class="label-text"> Nombre del evento </span>
			</div>
			<input
				name="name"
				type="text"
				placeholder="Evento X"
				class="input input-bordered w-full max-w-xs"
				required
			/>
		</label>
		<label class="form-control w-full max-w-xs">
			<div class="label">
				<span class="label-text"> Tipo de formulario</span>
			</div>
			<select
				name="formType"
				placeholder="Evento X"
				class="select select-bordered w-full max-w-xs"
				required
			>
				{#each templates as template}
					<option value={template.name}>{template.name}</option>
				{/each}
			</select>
		</label>
		<div class=" form-control">
			<button class="btn btn-primary" type="submit">Crear</button>
		</div>
	</form>
</div>
