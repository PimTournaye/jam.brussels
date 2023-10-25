<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	// Form stuff
	import ProgressBar from '$lib/components/form/ProgressBar.svelte';
	import ContentForm from '$lib/components/form/ContentForm.svelte';
	import DetailsForm from '$lib/components/form/DetailsForm.svelte';

	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { superForm } from 'sveltekit-superforms/client';

	const { form, enhance } = superForm(data.form);

	// Progress bar
	let steps = ['Details', 'Content', 'Review', 'Confirm'];
	let currentActive = 1;
	let progressBar: ProgressBar;
	const handleProgress = (stepIncrement: number) => progressBar.handleProgress(stepIncrement);
	$: activeStep = steps[currentActive - 1];
</script>

<svelte:head>
	<title>Submit a new jam session - Jam.brussels</title>
</svelte:head>

<SuperDebug data={$form} />

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
		<div id="form">
			{#if activeStep === 'form'}
				<DetailsForm data={data} />
			{/if}
			{#if activeStep === 'Content'}
				<ContentForm data={data} />
			{/if}
			{#if activeStep === 'Review'}
				<form action="?/confirm" use:enhance>
					<h2>Review</h2>
					<span>Please check your info before submitting it.</span>
					<div class="review-section">
						<h4>Date</h4>
						<p>{$form.date}</p>
						<h4>Time</h4>
						<p>{$form.startTime} to {$form.endTime}</p>
						<h4>Location</h4>
						<p>{$form.location}</p>
					</div>
					<div class="review-section">
						<h4>Title</h4>
						<p>{$form.title}</p>
						<h4>Band name</h4>
						<p>{$form.bandName}</p>
						<h4>Description</h4>
						<p>{$form.description}</p>
						<h4>Image</h4>
						<img src="" alt="" />
					</div>
					<button class="btn bg-cinnabar mt-2">Submit</button>
				</form>
			{/if}
			{#if activeStep === 'Confirm'}
				<p>Done</p>
				<button>Go to jam session</button>
			{/if}
		</div>
		{#if activeStep !== 'Confirm'}
			<div class="buttons">
				<button
				class="btn border-2 border-cinnabar"
				class:opacity={currentActive == 1}
				on:click={() => handleProgress(-1)}
				disabled={currentActive == 1}>Prev</button
				>
				{#if activeStep !== 'Review'}
				<button
					class="btn bg-cinnabar"
					on:click={() => handleProgress(+1)}
					disabled={currentActive == steps.length}>Next</button
				>
				{/if}
			</div>
		{/if}
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

	#form {
		@apply p-2 mb-2 w-full;
		@apply bg-cadet-grey bg-opacity-40 rounded-xl;
	}

	.buttons {
		@apply flex flex-row items-center justify-center;
		@apply w-full px-2 mb-4 gap-4;
		@apply grow-0 self-end;
	}

	.btn {
		@apply p-4 w-full;
		@apply rounded-xl text-lg;
	}

	.opacity {
		opacity: 0.4;
		transition: opacity 0.2s ease-in-out;
	}


	form h2 {
		@apply text-2xl font-bold text-center;
		@apply px-4 py-1 w-full;
		@apply rounded-t-xl;
	}

	form span {
		@apply text-base text-cararra text-left italic;
		@apply p-1 w-full;
	}

	.review-section h3 {
		@apply text-lg font-bold text-cararra-600;
		@apply mt-4;
	}

	.review-section h4 {
		@apply text-lg font-medium text-cararra-600;
	}

	.review-section p {
		@apply text-base text-cararra mb-2;
	}
	
</style>
