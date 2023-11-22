<script>
	import authStore from '$lib/auth/aplication/authStore';

	async function login() {
		await authStore.loginGoogle();
	}
</script>

<button on:click={login}>Login</button>
