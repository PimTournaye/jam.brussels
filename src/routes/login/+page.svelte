<script lang="ts">
	import type { PageData } from './$types';
	import { supabase } from '$lib/db/supabaseClient';

	export let data: PageData;
  
	type FormState = 'idle' | 'submitting' | Error | 'done';
	let state: FormState = 'idle';

	function isValidEmail(email: string) {
		const emailRegex =
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return emailRegex.test(email);
	}
</script>

<svelte:head>Login - Jam.brussels</svelte:head>

{#if state !== 'done'}
	<form
		method="POST"
		on:submit|preventDefault={async ({ currentTarget }) => {
			const formData = new FormData(currentTarget);
			const email = formData.get('email');
			if (!isValidEmail(email)) state = new Error('Please enter a valid email address.')
			try {
				state = 'submitting';	
				const { error } = await supabase.auth.signInWithOtp({ email });
				if (error) throw error;
				state = 'done';
			} catch (error) {
				if (error instanceof Error) {
					state = error;
				} else {
					state = new Error('Something went wrong sending your email!');
				}
			}
		}}
	>
		<label for="email">Register / Login with magic link</label>
		<input type="email" name="email" id="email" placeholder="your@email.com" required />
		<button disabled={state === 'submitting'}>Send magic link</button>
		{#if state instanceof Error}
			<p>{state.message}</p>
		{/if}
	</form>
	<button on:click={async () => {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'google'
		});
	}}>
		GOOGLE
	</button>
{:else}
	<p>We've sent you an email! Please check your inbox.</p>
{/if}

<style>
	label {
		display: block;
	}

	input {
		display: block;
	}

	button {
		display: block;
	}
</style>