<script>
	import Link from './Link.svelte';
	import { goto } from '$app/navigation';
	import authStore from '$lib/auth/aplication/authStore';

	async function logOut() {
		await authStore.logOut();
		goto('/');
	}

	let links = [
		{ label: 'Home', href: '/' },
		{ label: 'App', href: '/app' }
	];
</script>

<header>
	<nav>
		{#each links as link}
			<Link to={link.href}>{link.label}</Link>
		{/each}

		<button on:click={logOut}>Salir</button>
	</nav>
</header>
