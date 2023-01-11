<script lang="ts">
	import Header from '$lib/components/header/Header.svelte';
	import '../app.scss';
	import type { LayoutData } from './$types';

	export let data: LayoutData
</script>

<Header data={data}/>

<main class="lg:mx-40">
	<slot />
</main>
