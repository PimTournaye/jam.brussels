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

<header class="bg-log-cabin">
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
			transition:fly={{ y: 200, duration: 400 }}
			class="flex flex-col absolute
		space-y-12
		px-4 pt-8 h-full w-full
		backdrop-blur-xl
		"
		>
			<div
				class="
			flex flex-col space-y-12
			line line--m2"
			>
				{#if !loggedIn}
					<a href="/login" class="station station--default">Login / Signup</a>
				{:else}
					<a href="/logout" class="station station--default">Logout</a>
				{/if}
				<a href="/jams" class="station station--default">Jams</a>
				<a href="/submit" class="station station--default">Submit Jam Session</a>
				<a href="/info" class="station station--end">FAQ & Info</a>
			</div>
		</nav>
	{/if}
</header>

<style lang="scss">
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
