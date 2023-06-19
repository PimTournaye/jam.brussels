<script lang="ts">
  import { Icon } from '@steeze-ui/svelte-icon';
import type { PageData } from './$types';
	import CompactJamCard from '$lib/components/CompactJamCard.svelte';
  
  export let data: PageData;
  
  function generateJamSessions() {
    const jamSessions = [];
    const currentDate = new Date();
    
    for (let i = 0; i < 6; i++) {
      const jamDate = new Date(currentDate);
      jamDate.setMonth(currentDate.getMonth() + i);
      
      jamSessions.push({
        title: `Jam session ${i + 1}`,
        date: jamDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
        location: `Location ${i + 1}`,
        id: i + 1
      });
    }
    return jamSessions;
  }

  let jams = generateJamSessions();
</script>

<svelte:head>
  <title>Jam sessions - Jam.brussels</title>
</svelte:head>

<section class="bg-log-cabin mx-0.5">
  {#each jams as {title, date, location, id}}
  <CompactJamCard {title} {date} {location} {id} />
  {/each}

  <div class="text-cararra text-lg mx-auto px-4">
    Jam sessions displayed here are limited to the next 6 months.
    
      <a href="/jams/submit"
        class="rounded-lg bg-cararra text-log-cabin mt-4
      flex justify-center 
      h-12 py-2 w-full
       text-black font-semibold text-xl">Add a new jam session
       </a>

  </div>
</section>
