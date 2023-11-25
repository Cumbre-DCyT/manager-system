<script>
	import authStore from '$lib/auth/aplication/authStore';
	import App from './app.svelte';
	import Login from './login.svelte';

	let user = authStore.user;
</script>

{#if $user}
	<App />
{:else}
	<Login />
{/if}
