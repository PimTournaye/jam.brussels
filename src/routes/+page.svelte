<script lang="ts">
	import type {PageData} from './$types'
	import JamCard from '$lib/components/JamCard.svelte';

	export let data: PageData

	let {todayJams, upcomingJams,} = data;

</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div class="mt-8 mx-4">
	<h1 class="text-4xl font-bold">Welcome back
	</h1>
	<h2 class="text-lg text-cararra-900 font-medium">Here's what's happening soon</h2>
</div>

<section class="mt-8 mb-8">
	<div>
		<h1 class="text-bold text-2xl mx-4">Today</h1>
		{#if !todayJams || todayJams.length === 0}
		<div class="flex flex-col justify-center mx-auto my-4
		w-full h-60
		border-4 border-cararra-900 rounded-xl">
			<h1 class="font-light text-2xl mx-auto mb-8">No events today!</h1>
			<img src="/music_note_white_24dp.svg" class="w-16 h-16 mx-auto text-cararra-900" alt="icon of a music note"/>
		</div>
		{:else}
			{#each todayJams as { image, title, date, startTime, endTime, location, openingBand, uuid }}
			<JamCard {image} {title} {date} {startTime} {endTime} {location} {openingBand} color={'bg-tulip-tree'} {uuid} />
			{/each}
		{/if}
	</div>

	<div class="mt-8">
		<h1 class="text-bold text-2xl mx-4">Upcoming</h1>
		{#if !upcomingJams || upcomingJams.length === 0}
		<div class="flex flex-col justify-center mx-auto my-4
		w-full h-60
		border-4 border-cararra-900 rounded-xl">
			<h1 class="font-light text-xl mx-auto mb-8 text-center px-2">No events in the coming two weeks!</h1>
			<a class="mx-auto mb-2 underline text-cararra-800" href="/jams">Check the calender</a>
			<img src="/music_note_white_24dp.svg" class="w-16 h-16 mx-auto text-cararra-900" alt="icon of a music note"/>
		</div>
		{:else}
			{#each upcomingJams as { image, title, date, startTime, endTime, location, openingBand, uuid }}
			<JamCard {image} {title} {date} {startTime} {endTime} {location} {openingBand} color={'bg-cinnabar'} {uuid} />
			{/each}
		{/if}
	</div>
</section>

<div class="my-4 mx-4">
	Don't see your jam session on the list? Click the button below!
	<a href="/jams/submit"
		class="rounded-lg bg-cararra text-log-cabin mt-4
  flex justify-center 
  h-12 py-2 w-full
	 text-black font-semibold text-xl">Add a new jam session
	 </a>
</div>
