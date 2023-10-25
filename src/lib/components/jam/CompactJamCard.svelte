<script lang="ts">
  import Icon from '@iconify/svelte';
  export let title: string;
  export let location: string;
  export let date: string;
  export let id: number;

</script>

<a href="/jams/{id}" class="border-2 border-cararra-900 p-4 mb-4 rounded-lg font-light shadow-md flex fles-row justify-between align-middle">
  <div>
    <h3 class="text-cinnabar text-lg font-bold">{title}</h3>
    <p class="flex flex-row items-center">
      <Icon icon="lucide:map-pin" width="16" height="16" class="mr-1.5 mb-0.5" />
      {location}</p>
  </div>
  <p class="text-tulip-tree text-xl my-auto">{date}</p>
</a>