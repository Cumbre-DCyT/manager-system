<script>
	import { goto } from '$app/navigation';
	async function handleClick() {
		const response = await fetch('api/google', {
			method: 'POST'
		});
		const { url } = await response.json();
		goto(url);
	}
</script>

<div class="w-full flex mt-2">
	<button on:click={handleClick} class="btn btn-info mx-auto">Get Google Tokens Access</button>
</div>
