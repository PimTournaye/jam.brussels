<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
	import '../app.css';
</script>

<header>
	<Nav />
</header>

<main class="mx-3 lg:mx-40">
	<slot />
</main>
