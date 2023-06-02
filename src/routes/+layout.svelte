<script lang="ts">
	import Header from '$lib/components/header/Header.svelte';
	import { onMount } from 'svelte';
	import '../app.scss';
	import type { LayoutData } from './$types';
	import { supabaseClient } from '$lib/supabase';
	import { invalidateAll } from '$app/navigation';
	export let data: LayoutData;

	onMount(() => {
		const { data: {subscription} } = supabaseClient.auth.onAuthStateChange((event, session) => {
			invalidateAll();
		});

		return () => subscription?.unsubscribe();
	});
</script>

<Header {data} />

<main class="">
	<slot />
</main>
