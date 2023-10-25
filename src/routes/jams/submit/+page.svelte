<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import ProgressBar from '$lib/components/form/ProgressBar.svelte';
	import DetailsForm from '$lib/components/form/DetailsForm.svelte';
	import ContentForm from '$lib/components/form/ContentForm.svelte';
  
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	const { form, errors, constraints, enhance } = superForm(data.form);

	let steps = ['Details', 'Content', 'Review', 'Confirm'];
	let currentActive = 1;
	let progressBar: ProgressBar;
	const handleProgress = (stepIncrement: number) => progressBar.handleProgress(stepIncrement);
	$: activeStep = steps[currentActive - 1];
</script>

<svelte:head>
	<title>Submit a new jam session - Jam.brussels</title>
</svelte:head>

<SuperDebug {form} />

<section id="main">
	<div class="top">
		<h1>New jam session</h1>
		<p>
			Please fill in the necessary information to submit a new jam session. Once submitted, it will
			appear in the list of upcoming jams.
		</p>
	</div>

	<div class="container">
		<ProgressBar {steps} bind:currentActive bind:this={progressBar} />
		<form action="">
			{#if activeStep === 'Details'}
				<DetailsForm data={data.login}/>
			{/if}
			{#if activeStep === 'Content'}
				<ContentForm />
			{/if}
			{#if activeStep === 'Review'}{/if}
			{#if activeStep === 'Confirm'}{/if}
		</form>
		<div class="buttons">
			<button
				class="btn border-2 border-cinnabar"
				class:opacity={currentActive == 1}
				on:click={() => handleProgress(-1)}
				disabled={currentActive == 1}>Prev</button
			>
			<button
				class="btn bg-cinnabar"
				on:click={() => handleProgress(+1)}
				disabled={currentActive == steps.length}>Next</button
			>
		</div>
	</div>
</section>

<style lang="postcss">
	/* General structure */
	section {
		@apply flex flex-col items-center justify-center h-full;
	}

	/* Top part */
	.top {
		@apply flex flex-col flex-none items-center justify-center;
		@apply w-full px-2;
	}

	.top h1 {
		@apply text-4xl font-bold text-center;
		@apply bg-cinnabar text-log-cabin;
		@apply p-4 w-full;
		@apply rounded-xl;
	}

	.top p {
		@apply text-base text-cararra;
		@apply p-4 w-full;
	}

	/* Form */
	.container {
		@apply flex flex-col flex-auto items-center justify-center;
		@apply w-full px-2 mt-8;
	}

	.buttons {
		@apply flex flex-row items-center justify-center;
		@apply w-full px-2 mb-4 gap-4;
		@apply grow-0 self-end;
	}

	.buttons .btn {
		@apply p-4 w-full;
		@apply rounded-xl text-lg;
	}

	.opacity {
		opacity: 0.4;
		transition: opacity 0.2s ease-in-out;
	}

	form {
		@apply grow w-full;
		@apply px-2 mb-4 rounded-xl;
		@apply bg-cadet-grey bg-opacity-40;
	}
</style>
