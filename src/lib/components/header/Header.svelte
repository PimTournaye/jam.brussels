<script lang="ts">
	import Hamburger from './Hamburger.svelte';
	import { fade } from 'svelte/transition';
	import logo from './logo-dark.svg';
	import { navigating } from '$app/stores';
	import { browser } from '$app/environment';

	export let open = false;
	export let onClick = (): void => {
		open = !open;
		if (browser) document.body.style.overflow = open ? "hidden" : "scroll";
	};

	$: if($navigating) {
		open = false;
		if (browser) document.body.style.overflow = "scroll";
	}

	export let data;

	const {session} = data;
</script>

<header class="bg-log-cabin stivky top-0 grow-0">
	<div class="flex justify-between h-20 pl-2 pr-4 py-5 bg-log-cabin">
		<Hamburger {open} {onClick} />
		<div class="logo">
			<a href="/">
				<img src={logo} alt="logo" class="w-40 h-12" />
			</a>
		</div>
	</div>

	{#if open}
		<nav
		in:fade={{ duration: 300 }}
		out:fade={{ duration: 100 }}
			class="flex flex-col absolute
		space-y-12
		px-4 pt-8 h-screen w-screen
		backdrop-blur-xl bg-opacity-50 bg-black
		transform transition-all ease-in-out duration-300
		"
		>
			<div
				class="
			flex flex-col space-y-12
			line line--m2"
			>
				{#if !session}
				<a href="/login" class="station station--default">Login or Register</a>
				<!-- {:else} -->
				<!-- <a href="/profile" class="station station--default">Profile</a> -->
				{/if}
				<a href="/jams" class="station station--default">Jams</a>
				<a href="/jams/submit" class="station station--default">Submit Jam Session</a>
				{#if session}
				<a href="/info" class="station station--default">FAQ & Info</a>
				<form action="/logout" method="POST">
				<button class="station station--end">Logout</button></form>
				{:else}
				<a href="/info" class="station station--end">FAQ & Info</a>
				{/if}
				
			</div>
		</nav>
	{/if}
</header>

<style lang="scss">
	header {
		z-index: 100;
		width: 100%;
	}

	nav {
		z-index: 90;
	}

	$base-font-size: 1.25em;
	$base-spacing-unit: 1em;
	$station-name-width: 9em;
	$line-height: $base-font-size * 1.4;

	.station {
		padding-left: 32px;

		&--default:before {
			content: '';
			position: absolute;
			left: -14px;
			height: 24px;
			width: 24px;
			// margin-top: px;

			border: 4px solid #111613;
			background-color: #ECEDE6;

			border-radius: 50%;
		}

		&--end:before {
			content: '';
			position: absolute;
			left: -14px;
			height: 24px;
			width: 24px;

			border: 4px solid #111613;
			background-color: #ECEDE6;

			border-radius: 999px;
		}
	}

	.line--m2 {
		position: absolute;
		border-left: 4px solid #e8ae3b;
		margin-left: 10px;
	}
</style>
