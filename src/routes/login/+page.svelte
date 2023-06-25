<script lang="ts">
	import { supabaseClient } from '$lib/supabase';
	import type { Provider } from '@supabase/supabase-js';
	import type { PageData, SubmitFunction } from './$types';
	import { enhance } from '$app/forms';
	export let data: PageData;

	const signinWithProvider = async (provider: Provider) => {
		const { data, error } = await supabaseClient.auth.signInWithOAuth({ provider: provider });
		if (error) throw error;
	};

	const submitSocialLogin: SubmitFunction = async ({ action, cancel }) => {
		switch (action.searchParams.get('provider')) {
			case 'google':
				await signinWithProvider('google');
				break;
			default:
				break;
		}
		cancel();
	};
</script>

<svelte:head>
	<title>Login - Jam.brussels</title>
</svelte:head>

<div id="login">
	<h1 class=" text-6xl font-medium mb-16">Login</h1>

	<form action="?/login" method="POST">
		<label for="email" class="block text-gray-700 mb-2"> Register / Login with magic link</label>
		<input
			type="email"
			name="email"
			id="email"
			placeholder="your@email.com"
			required
			class="w-full py-2 px-2 border-2 border-cinnabar focus:border-cinnabar-900 bg-log-cabin rounded-lg"
		/>
		<button
			type="button"
			class="login-button">Send magic link to mail</button
		>
	</form>

	<form method="POST" use:enhance={submitSocialLogin}>
		<button
			formaction="?/login&provider=google"
			type="button"
			class="text-white bg-log-cabin border-solid border-2 border-cararra focus:ring-4 focus:outline-none rounded-lg p-8 text-center inline-flex items-center"
		>
			<svg
				class="w-8 h-8"
				aria-hidden="true"
				focusable="false"
				data-prefix="fab"
				data-icon="google"
				role="img"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 488 512"
				><path
					fill="currentColor"
					d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
				/></svg
			>
		</button>
	</form>
</div>

<style lang="postcss">
	#login {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
	}

	.login-button {
		@apply py-2.5 px-5 mb-12 mt-4 w-full;
		@apply text-sm font-medium text-gray-900;
		@apply rounded-lg border border-tulip-tree hover:bg-tulip-tree;
	}
</style>
