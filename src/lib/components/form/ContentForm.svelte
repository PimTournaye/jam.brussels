<script lang="ts">
	import Icon from '@iconify/svelte';
	import Input from './Input.svelte';
	
	export let form, errors, constraints;
</script>

<div id="form">
	<!-- Title -->
	<Input
		label="Title"
		icon="lucide:pencil-line"
		description="What is your jam session called?"
		inputType="text"
		name="title"
		bind:value={$form.title}
		constraints={$constraints.title}
		errors={$errors.title}
		/>

	<!-- Band -->
	<Input
		label="Band"
		icon="lucide:music"
		description="What is the name of your band?"
		inputType="text"
		name="openingBand"
		bind:value={$form.openingBand}
		constraints={$constraints.openingBand}
		errors={$errors.openingBand}
		/>

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
		{#if $errors.description}<small class="text-red-500 text-sm">{$errors.description}</small>{/if}
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
				accept=".jpg, .png, .webp, .avif"
				autocomplete="off"
				required
				class="file-input"
			/>
			<span><Icon icon="lucide:camera" class="inline-block w-5 h-5 text-log-cabin" /></span>
		</div>
		{#if $errors.image}<small class="text-red-500 text-sm">{$errors.image}</small>{/if}
		<p>Upload a picture or banner for the jam session. This will be displayed on the website.</p>
		<!-- <p>
			AVIF, WEBP, JPG or PNG. Try using tools like <a href="https://squoosh.app/">Squoosh</a> to reduce
			file size while maintaining image quality.
		</p> -->
	</div>
</div>

<style lang="postcss">
	#form {
		@apply flex flex-col;
		@apply w-full;
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

	input,
	textarea {
		@apply w-full px-2 py-1;
		@apply rounded-md;
		@apply bg-cadet-grey text-log-cabin;
		@apply border-2 border-cadet-grey;
		@apply text-lg;
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
