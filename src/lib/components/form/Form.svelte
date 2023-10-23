<script lang="ts">
	import type { PageData } from './$types';
	import ContentForm from './ContentForm.svelte';
  import DetailsForm from "./DetailsForm.svelte";
  export let activeStep: string;

  export let data: PageData;

</script>

<form action="">
{#if activeStep === "Details"}
  <DetailsForm />
{/if}
{#if activeStep === "Content"}
  <ContentForm />
{/if}
{#if activeStep === "Review"}
  
{/if}
{#if activeStep === "Confirm"}

{/if}
</form>

<style lang="postcss">
	form {
		@apply grow w-full;
    @apply px-2 mb-4 rounded-xl;
    @apply bg-cadet-grey bg-opacity-40;
	}
</style>
