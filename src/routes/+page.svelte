<script>
	import authStore from '$lib/auth/aplication/authStore';
	import App from './App.svelte';
	import Login from './Login.svelte';

	let user = authStore.user;
</script>

{#if $user}
	<App />
{:else}
	<Login />
{/if}
