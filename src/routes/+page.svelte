<script lang="ts">
	import { formatShortDate } from '$lib/utils/DateFormatting';
	import JamCard from '$lib/components/JamCard.svelte';
	import { onMount } from 'svelte';

	export let data: any;
	let { todayJams, upcomingJams } = data;

	console.log(todayJams, upcomingJams);
</script>

<div class="mt-8 mx-4">
	<h1 class="text-4xl font-bold">Welcome back!</h1>
	<h2 class="text-lg text-willow-brook font-bold">Here's what's happening soon</h2>
</div>

<section class="mt-8 mb-8">
	<div>
		<h1 class="text-bold text-2xl mx-4">Today</h1>
		{#if todayJams}
			{#each todayJams as { image, title, date, time, location, openingBand, id }}
			<JamCard {image} {title} {date} {time} {location} {openingBand} {id} />
			{/each}
		{:else}
			<h1 class="text-bold text-2xl">No events today</h1>
		{/if}
	</div>

	<div class="mt-8">
		<h1 class="text-bold text-2xl mx-4">Upcoming</h1>
		{#each upcomingJams as { image, title, date, time, location, openingBand, id }}
			<JamCard {image}{title} {date} {time} {location} {openingBand} {id} />
		{/each}
	</div>
</section>

<div class="mt-8 mx-4">
	Don't see your jam session on the list? Click the button below!
	<button
		class="rounded-lg bg-cararra text-log-cabin mt-4
  flex justify-center 
  h-12 py-2 w-full
	 text-black font-semibold text-xl">Add a new jam session</button
	>
</div>
