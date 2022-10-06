<script lang="ts">
	import JamCard from '$lib/components/JamCard.svelte';
	import { checkUpcomingDate, matchDateToToday } from '$lib/prisma/DateChecking';
	import { jamSessions } from '$lib/testCards';

	let todayEvents: any[] = [];
	let upcomingEvents: any[] = [];

	$: {
		todayEvents = jamSessions.filter((event) => matchDateToToday(event.date as Date));
		upcomingEvents = jamSessions.filter((event) => checkUpcomingDate(event.date as Date));
	}

  console.log(todayEvents);
  
</script>

<div class="mt-8">
	<h1 class="text-4xl font-bold">Welcome back!</h1>
	<h2 class="text-lg text-[#CACACA] font-bold">Here's what's happening soon</h2>
</div>

<section class="mt-8">
	<h1 class="text-bold text-2xl">Today</h1>
	{#if todayEvents}
		{#each todayEvents as { title, date, time, location, description, id }}
			<JamCard {title} {date} {time} {location} {description} {id} />
		{/each}
	{:else}
		<h1 class="text-bold text-2xl">No events today</h1>
	{/if}

	<h1 class="text-bold text-2xl">Upcoming</h1>
	{#each upcomingEvents as { title, date, time, location, description, id }}
		<JamCard {title} {date} {time} {location} {description} {id} />
	{/each}
</section>

<div>
	Don't see your jam session on the list? Click the button below!
	<button
		class="rounded-lg bg-[#D9D9D9] mt-4
  flex justify-center 
  h-12 py-2 w-full
text-black font-semibold text-xl">Add a new jam session</button
	>
</div>
