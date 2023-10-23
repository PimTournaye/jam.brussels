<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms/client';
	import { z } from 'zod';

	const schema = z.object({
		date: z.date().min(new Date(), { message: 'Date must be today or in the future' }),
		startTime: z.string(),
		endTime: z.string(),
		location: z.string()
	});

	type DetailSchema = typeof schema;

	export let data: SuperValidated<DetailSchema>;

	const { form, errors, constraints, enhance } = superForm(data);
</script>

<form method="POST" use:enhance>
	<!-- Date -->
	<div class="detail-group">
		<label for="date">Date</label>
		<div class="input-group">
			<input
			aria-invalid={$errors.date ? 'true' : undefined}
			bind:value={$form.date}
			{...$constraints.date}
			type="date"
			name="date"
			id="date"
			class=""
			autocomplete="off"
			required
			/>
			<span>
				<Icon icon="lucide:calendar" class="inline-block w-5 h-5 text-log-cabin" />
			</span>
		</div>
		{#if $errors.date}<small class="invalid text-red-500 text-sm">{$errors.date}</small>{/if}
		<p>What day is the jam taking place?</p>
	</div>
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
			class="time"
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
			class="time"
			autocomplete="off"
			/>
			<span>
				<Icon icon="lucide:clock" class="inline-block w-5 h-5 text-log-cabin" />
			</span>
		</div>
		{#if $errors.startTime}<small class="invalid text-red-500 text-sm">{$errors.startTime}</small
			>{/if}
		{#if $errors.endTime}<small class="invalid text-red-500 text-sm">{$errors.endTime}</small>{/if}
		<p>At what time is the jam taking place?</p>
	</div>

	<!-- Location -->
	<div class="detail-group">
		<label for="location">Location</label>
		<div class="input-group">
			<input
			aria-invalid={$errors.location ? 'true' : undefined}
			bind:value={$form.location}
			{...$constraints.location}
			required
			type="text"
			name="location"
			id="location"
			autocomplete="off"
			/>
			<span>
				<Icon icon="lucide:map-pin" class="inline-block w-5 h-5 text-log-cabin" />
			</span>
		</div>
		{#if $errors.location}<small class="invalid text-red-500 text-sm">{$errors.location}</small
			>{/if}
		<p>Where is the jam taking place?</p>
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
