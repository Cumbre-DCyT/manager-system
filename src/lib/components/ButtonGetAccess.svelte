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

<button on:click={handleClick}>get access</button>
