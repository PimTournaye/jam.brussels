<script lang="ts">
	import Icon from '@iconify/svelte';

	import type { SuperValidated } from 'sveltekit-superforms';
	import type { DetailsSchema } from '$lib/schemas';
	import { superForm } from 'sveltekit-superforms/client';
	import Input from './Input.svelte';

	export let data;
	// export let data: SuperValidated<DetailsSchema>;

	const { form, errors, constraints } = superForm(data.form)
</script>

<form method="POST">
	<!-- Date -->
	<Input 
	label="Date" 
	icon="lucide:calendar" 
	description="What day is the jam taking place?" 
	inputType="date"
	bind:value={$form.date}
	constraints={$constraints.date}
	errors={$errors.date}
	/>
	<!-- Time -->
	<div class="detail-group">
		<label for="time">Time</label>
		<div class="input-group space-x-4">
			<input
				aria-invalid={$errors.startTime ? 'true' : undefined}
				bind:value={$form.startTime}
				{...$constraints.startTime}
				required
				type="time"
				name="startTime"
				id="startTime"
				autocomplete="off"
			/>
			<p>to</p>
			<input
				aria-invalid={$errors.endTime ? 'true' : undefined}
				bind:value={$form.endTime}
				{...$constraints.endTime}
				required
				type="time"
				name="endTime"
				id="endTime"
				autocomplete="off"
			/>
			<span>
				<Icon icon="lucide:clock" class="inline-block w-5 h-5 text-log-cabin" />
			</span>
		</div>
		{#if $errors.startTime}<small class="invalid text-red-500 text-sm">{$errors.startTime}</small>{/if}
		{#if $errors.endTime}<small class="invalid text-red-500 text-sm">{$errors.endTime}</small>{/if}
		<p>At what time is the jam taking place?</p>
	</div>

	<!-- Location -->
	<Input
		label="Location"
		icon="lucide:map-pin"
		description="Where is the jam taking place?"
		inputType="text"
		bind:value={$form.location}
		constraints={$constraints.location}
		errors={$errors.location}
	/>
</form>

<style lang="postcss">
	form {
		@apply flex flex-col;
		@apply w-full;
	}

	.detail-group {
		@apply flex flex-col;
		@apply w-full;
		@apply mb-4;
	}

	.input-group {
		@apply flex flex-row items-center relative;
	}

	span {
		@apply absolute inset-y-0 right-0 flex items-center pr-2;
	}

	input {
		@apply w-full px-2 py-1;
		@apply rounded-md;
		@apply bg-cadet-grey text-log-cabin;
		@apply border-2 border-cadet-grey;
		@apply text-lg text-center;
		@apply focus:border-cinnabar;
		@apply focus:outline-none;
		@apply transition-all duration-200;
	}

	label {
		@apply text-lg font-bold text-cararra-600;
		@apply mb-1 ml-0.5;
	}

	p {
		@apply text-sm text-cararra-400;
		@apply mt-1 ml-0.5;
	}

	input[type='date']::-webkit-calendar-picker-indicator {
		display: none;
	}

	input[type='date']::-moz-calendar-picker-indicator {
		display: none;
	}

	input[type='date']::-ms-calendar-picker-indicator {
		display: none;
	}

	input[type='time']::-webkit-calendar-picker-indicator {
		display: none;
	}

	input[type='time']::-moz-calendar-picker-indicator {
		display: none;
	}

	input[type='time']::-ms-calendar-picker-indicator {
		display: none;
	}
</style>
