<script>
	import { goto } from '$app/navigation';
	import authStore from '$lib/auth/aplication/authStore';

	async function logOut() {
		await authStore.logOut();
		goto('/');
	}
</script>

<button on:click={logOut}>Salir</button>
<h1>App</h1>
