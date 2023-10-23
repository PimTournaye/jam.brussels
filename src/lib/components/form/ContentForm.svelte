<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms/client';
	import { z } from 'zod';

	const schema = z.object({
		title: z.string().min(3, 'Title must be at least 3 characters long.'),
		bandName: z
			.string()
			.min(3, 'Band name must be at least 3 characters long.')
			.max(50, 'Band name must be at most 50 characters long.'),
		description: z
			.string()
			.min(3, 'Description must be at least 3 characters long.')
			.max(500, 'Description must be at most 500 characters long.'),
		image: z.any()
	});

	type DetailSchema = typeof schema;

	export let data: SuperValidated<DetailSchema>;

	const { form, errors, constraints, enhance } = superForm(data);
</script>

<form method="POST" use:enhance>
	<!-- Title -->
	<div class="detail-group">
		<label for="title">Title</label>
		<div class="input-group">
			<!-- <Icon icon="lucide:calendar" class="inline-block w-7 h-7 mt-1" /> -->
			<input
				aria-invalid={$errors.title ? 'true' : undefined}
				bind:value={$form.title}
				{...$constraints.title}
				type="text"
				name="title"
				id="tilte"
				autocomplete="off"
				required
			/>
			<span><Icon icon="lucide:pencil-line" class="inline-block w-5 h-5 text-log-cabin" /></span>
		</div>
		{#if $errors.title}<small class="invalid text-red-500 text-sm">{$errors.title}</small>{/if}
		<p>What is your jam session called?</p>
	</div>

	<!-- Band -->
	<div class="detail-group">
		<label for="bandName">Band name</label>

		<div class="input-group">
			<input
				aria-invalid={$errors.title ? 'true' : undefined}
				bind:value={$form.title}
				{...$constraints.title}
				required
				type="text"
				name="title"
				id="title"
				class="grow"
				autocomplete="off"
			/>
			<span>
				<Icon icon="lucide:music" class="inline-block w-5 h-5 text-log-cabin" />
			</span>
		</div>
		{#if $errors.title}<small class="invalid text-red-500 text-sm">{$errors.title}</small>{/if}
		<p>Who is hosting or opening the jam?</p>
	</div>

	<!-- Description -->
	<div class="detail-group">
		<label for="description">Description</label>
		<div class="input-group">
			<textarea
				required
				name="description"
				id="description"
				cols="30"
				rows="10"
				placeholder="this this that, this bandmember, another bandmember..."
				autocomplete="off"
				style="white-space: pre-wrap;"
				bind:value={$form.description}
				{...$constraints.description}
			/>
		</div>
		{#if $errors.description}<small class="invalid text-red-500 text-sm">{$errors.description}</small>{/if}
    <p>Please provide an additional details relating to the jam session above.</p>
	</div>

  <!-- Image -->
  <div class="detail-group">
    <label for="image">Image</label>
    <div class="input-group">
      <input
        aria-invalid={$errors.image ? 'true' : undefined}
        bind:value={$form.image}
        {...$constraints.image}
        type="file"
        name="image"
        id="image"
        autocomplete="off"
        required
        class="file-input"
      />
      <span><Icon icon="lucide:camera" class="inline-block w-5 h-5 text-log-cabin" /></span>
    </div>
    {#if $errors.image}<small class="invalid text-red-500 text-sm">{$errors.image}</small>{/if}
    <p>Upload a picture or banner for the jam session. This will be displayed on the website.</p>
    <p>AVIF, WEBP, JPG or PNG. Try using tools like <a href="https://squoosh.app/">Squoosh</a> to reduce file size while maintaining image quality. </p>
  </div>
</form>

<style lang="postcss">
	form {
		@apply flex flex-col;
		@apply w-full py-4;
	}

	.detail-group {
		@apply flex flex-col;
		@apply w-full;
		@apply mb-4;
	}

	.input-group {
		@apply flex flex-row items-center;
		@apply relative;
	}

	input, textarea {
		@apply w-full px-2 py-1;
		@apply rounded-md;
		@apply bg-cadet-grey text-log-cabin;
		@apply border-2 border-cadet-grey;
		@apply text-lg text-center;
		@apply focus:border-cinnabar;
		@apply focus:outline-none;
		@apply transition-all duration-200;
	}

  textarea {
    @apply text-left text-base;
  }

  .file-input {
    @apply text-left text-base;
    @apply py-2 block;
  }

  a {
    @apply text-tulip-tree underline;
  }

	span {
		@apply absolute inset-y-0 right-0 flex items-center pr-2;
	}

	label {
		@apply text-lg font-bold text-cararra-600;
		@apply mb-1 ml-0.5;
	}

	p {
		@apply text-sm text-cararra-400;
		@apply mt-1 ml-0.5;
	}
</style>
