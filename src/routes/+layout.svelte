<script lang="ts">
	import Header from '$lib/components/header/Header.svelte';
	import Nav from '$lib/components/header/Nav.svelte';
	import '../app.scss';
</script>

<Header />

<main class="lg:mx-40">
	<slot />
</main>
