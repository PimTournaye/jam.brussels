<script lang="ts">
	import { Icon } from "@steeze-ui/svelte-icon";
  import { MapPin } from '@steeze-ui/heroicons';

  export let title: string;
  export let location: string;
  export let date: string;
  export let id: number;

</script>

<a href="/jams/{id}" class="border-2 border-cararra p-4 mb-4 rounded-lg shadow-md flex fles-row justify-between align-middle">
  <div>
    <h3 class="text-cinnabar text-lg font-bold">{title}</h3>
    <p class="flex flex-row items-center">
      <Icon src={MapPin} class="w-4 h-4 inline-block mr-1.5 mb-0.5" theme='outline'/>
      {location}</p>
  </div>
  <p class="text-tulip-tree text-xl my-auto">{date}</p>
</a>