<script lang="ts">
	import Hamburger from './Hamburger.svelte';
	import { fly } from 'svelte/transition';
  import logo from './logo-dark.svg';

	let loggedIn = false;

	export let open = false;
	export let onClick = (): void => {
		open = !open;
	};
</script>

<header>
	<div class="flex justify-between h-20 px-8 py-5 bg-black">
		<Hamburger {open} {onClick} />
		<div class="logo">
      <a href="/">
        <img src={logo} alt="logo" class="w-40 h-12"/>
      </a>
    </div>

	</div>

	{#if open}
		<nav transition:fly={{ y: -200, duration: 400 }} class="flex flex-col">
			{#if !loggedIn}
				<a href="/login">Login / Signup</a>
			{:else}
				<a href="/logout">Logout</a>
			{/if}
			<a href="/jams">Jams</a>
			<a href="/submit">Submit Jam Session</a>
			<a href="/info">FAQ & Info</a>
		</nav>
	{/if}
</header>
