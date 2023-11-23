<script>
	import { goto } from '$app/navigation';
	import authStore from '$lib/auth/aplication/authStore';

	window.authCallback = (response) => {
		console.log(response);
	};

	async function logOut() {
		await authStore.logOut();
		goto('/');
	}
</script>

<svelte:head>
	<script src="https://accounts.google.com/gsi/client" async defer></script>
</svelte:head>

<button on:click={logOut}>Salir</button>

<div
	id="g_id_onload"
	data-client_id="69363678559-a2q8ruuaaj0jc9557iuhg8qvv2ce9h72.apps.googleusercontent.com"
	data-context="signin"
	data-ux_mode="popup"
	data-callback="authCallback"
	data-itp_support="true"
></div>

<div
	class="g_id_signin"
	data-type="standard"
	data-shape="pill"
	data-theme="filled_black"
	data-text="signin_with"
	data-size="large"
	data-locale="en"
	data-logo_alignment="left"
></div>
<h1>App</h1>
