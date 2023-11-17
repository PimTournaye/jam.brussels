<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	// Form stuff
	import ProgressBar from '$lib/components/form/ProgressBar.svelte';
	import ContentForm from '$lib/components/form/ContentForm.svelte';
	import DetailsForm from '$lib/components/form/DetailsForm.svelte';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { formatShortDate } from '$lib/utils/DateFormatting';
	const { form, errors, constraints, enhance, message } = superForm(data.form, {
		dataType: 'json'
	});

	// For image preview in review
	let imgURL: string;
	$: if ($form.image) {
		const formEl = document.getElementById('data')! as HTMLFormElement;
		const formData = new FormData(formEl);
		const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
		const file = fileInput.files[0];
		formData.append('file', file);

		imgURL = URL.createObjectURL(file);
	}

	// Progress bar
	let steps = ['Details', 'Content', 'Review', 'Confirm'];
	let currentActive = 1;
	let progressBar: ProgressBar;
	const handleProgress = (stepIncrement: number) => {
		progressBar.handleProgress(stepIncrement);
		// Scroll to top
		window.scrollTo(0, 0);
	};
	$: activeStep = steps[currentActive - 1];
</script>

<svelte:head>
	<title>Submit a new jam session - Jam.brussels</title>
</svelte:head>

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
		{#if $message}
			<span class="error">
				{$message}
			</span>
		{/if}
		<div id="form">
			<form method="POST" enctype="multipart/form-data" use:enhance id="data">
				{#if activeStep === 'Details'}
					<DetailsForm {form} {errors} {constraints} />
				{/if}
				{#if activeStep === 'Content'}
					<ContentForm {form} {errors} {constraints} />
				{/if}
				{#if activeStep === 'Review'}
					<h2>Review</h2>
					<span>Please check your info before submitting it.</span>
					<div class="review-section">
						<h4>Date</h4>
						<p>{formatShortDate($form.date)}</p>
						{#if $errors.date}<small class="text-red-500 text-sm">{$errors.date}</small>{/if}
						<h4>Time</h4>
						<p>{$form.startTime} to {$form.endTime}</p>
						{#if $errors.startTime}<small class="text-red-500 text-sm">{$errors.startTime}</small
							>{/if}
						{#if $errors.endTime}<small class="text-red-500 text-sm">{$errors.endTime}</small>{/if}
						<h4>Location</h4>
						<p>{$form.location}</p>
						{#if $errors.location}<small class="text-red-500 text-sm">{$errors.location}</small
							>{/if}
					</div>
					<div class="review-section">
						<h4>Title</h4>
						<p>{$form.title}</p>
						{#if $errors.title}<small class="text-red-500 text-sm">{$errors.title}</small>{/if}
						<h4>Band name</h4>
						<p>{$form.openingBand}</p>
						{#if $errors.openingBand}<small class="text-red-500 text-sm"
								>{$errors.openingBand}</small
							>{/if}
						<h4>Description</h4>
						<p>{$form.description}</p>
						{#if $errors.description}<small class="text-red-500 text-sm"
								>{$errors.description}</small
							>{/if}
						<h4>Image</h4>
						<img src={imgURL} alt="" id="img" />
						{#if $errors.image}<small class="text-red-500 text-sm">{$errors.image}</small>{/if}
					</div>
					<button class="btn bg-cinnabar mt-2">Submit</button>
				{/if}
			</form>
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
		@apply flex flex-col flex-none items-center justify-center grow-0;
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
		@apply w-full px-2 mt-8 grow;
	}

	#form {
		@apply p-2 mb-2 w-full;
		@apply bg-cadet-grey bg-opacity-40 rounded-xl;
	}

	.buttons {
		@apply flex flex-row items-center justify-center;
		@apply w-full px-2 mb-4 gap-4 place-self-end;
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

	.review-section h4 {
		@apply text-lg font-medium text-cararra-600;
	}

	.review-section p {
		@apply text-base text-cararra mb-2;
	}

	.error {
		@apply text-lg text-cinnabar;
		@apply p-2 w-full;
		@apply rounded-xl;
	}

	img {
		@apply w-full h-auto mt-1;
		@apply rounded-xl;
	}
</style>
