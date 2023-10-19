<script lang="ts">
	import Header from '$lib/components/header/Header.svelte';
	import '../app.postcss';
	import type { LayoutData } from './$types';
	export let data: LayoutData;
</script>

<Header {data} />

<main class="">
	<slot />
</main>
