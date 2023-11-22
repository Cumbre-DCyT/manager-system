<script>
	import Link from './Link.svelte';

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
	</nav>
</header>
